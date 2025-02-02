import { User } from "../models/User.models.js";

const registerUser = async (req, res) => {
    // 1 -> STEPS FOR REGISTERING USER : 
    // 2 -> getting user details from frontend
    // 3 -> validating user details
    // 4 -> check if user already exsists: can check using username or email
    // 5 -> create entry in db
    // 6 -> check for user creation
    // 7 -> return response

    // 2 -> getting details from user
    const {username, password, email} = req.body;
    console.log(username, 'name given by user from userController');

    // 3 -> validating user details
    if (
        [email, username, password].some((field) => field?.trim() === "")
    ) {
        return res.status(400).json({error: 'enter valid credentials'}) 
    }

    // 4 -> checking if user already exsists
   try {
        console.log('above exsisted user')
        const exsistedUser = await User.findOne({
            $or: [{username}, {email}]
        })
        console.log(exsistedUser, 'exsisted user value')

        if(exsistedUser) {
            return res.status(409).json({ error: 'User already exists' });
        }
   } catch (error) {
        console.error('Error while checking the user:', error); // ✅ FIXED (Added detailed error logging)
        return res.status(500).json({ error: 'Error while checking the user' }); // ✅ FIXED (Corrected error handling)
   }

    // 5 -> creating a document in database
    let user;
   try {
        user = await User.create({
            username,
            password,
            email
        })
        console.log(user, "user from registerUser in userController");        
   } catch (error) {
        console.error('Error while adding user to the database:', error);
        return res.status(401).json({error: 'Error while adding user to database'})
   }
    
   let createdUser;

   // 6 -> check if user is created in bd
   try {

    createdUser = await User.findById(user?._id)
    console.log(createdUser, 'created user from registerUser in userController')

    if(!createdUser) {
        return res.status(500).json({ error: 'User was not created successfully' });
    }

   } catch (error) {
        console.error('Error while verifying the created user:', error);
        return res.status(500).json({ error: 'Error while verifying the created user' });
   }

   return res.status(201).json(createdUser)
}

export { registerUser }