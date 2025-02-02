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
        throw new Error('Enter Valid Credentials') 
    }

    // 4 -> checking if user already exsists
   try {
        const exsistedUser = await User.findOne({
            $or: [{username}, {email}]
        })

        if(exsistedUser) {
            throw new Error('User Already Exsists')
        }
   } catch (error) {
        console.log('error while checking the user');
        throw new Error('Error while checking the user', error)
   }

    // 5 -> creating a document in database
    const user = null
   try {
        user = await User.create({
            username,
            password,
            email
        })
        console.log(user, "user from regusterUser in userController");        
   } catch (error) {
        console.log('error while adding user to database')
        throw new Error('Error while adding user to database', error)
   }
    
   const createdUser = null

   // 6 -> check if user is created in bd
   try {

    createdUser = await User.findById(user?._id)
    log(createdUser, 'created user from registerUser in userController')

    if(!createdUser) {
        throw new Error('User is not created yet')
    }

   } catch (error) {
    console.log('error while checking the created user');
    throw new Error('Error while checking created user', error)
   }

   return res.status(200).json(createdUser)
}

export { registerUser }