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
        console.error('Error while adding user to the database: bad credentials', error);
        return res.status(401).json({error: 'Error while adding user to database: bad credentials'})
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

const loginUser = async (req, res) => {
    // STEPS FOR LOGGING USER
    // getting user details from frontend
    // validate user details for email and password
    // find the user
    // password check
    // generate acess token
    // send cookie
    // send response

    const {username, password, email} = req.body

    if(!(username?.trim() || email?.trim())) {
        console.log('username and email are required fields');
        return res.send(401).json({error: 'username and email are required fields'})
    }

    let user;
    try {
        user = await User.findOne({
            $or: [{email}, {username}]
        })

        if(!user) {
            res.status(500).json({error: 'user is not found in DB'})
        }
    } catch (error) {
        console.log('error while finding the user while logging in');
        return res.status(401).json({error: 'error while finding the user while logging in'})
    }

    try {
        const isPasswordValid = await user.isPasswordCorrect(password)
        if(!isPasswordValid) {
            res.status(401).json({error: 'password is invalid'})
        }
    } catch (error) {
        console.log('error while checking the password while logging');
        res.status(401).json({error: 'error while checking the password while logging'})
    }

    // getting acess token

    let acessToken;
    try {
        acessToken = await user.generateAcessToken()
    } catch (error) {
        console.log('error while getting the acess token');
        return res.status(401).json({error: 'error while getting acess token'})
    }

    // getting the loggedin user
    let loggedInUser;
    try {
        loggedInUser = await User.findById(user._id)
        if(!loggedInUser) {
            return res.status(500).json({error: 'user not logged in yet'})
        }
    } catch (error) {
        console.log('error while finding the user in DB while logging');
        return res.status(500).json({error: 'error while finding the user in DB while logging'})
    }

    // sending cookies
    const options = {
        httpOnly: true,
        secure: true,
    }

    return res
    .status(201)
    .cookie('acessToken', acessToken, options )
    .json({user: loggedInUser,acessToken})
}

const getUser = async (req, res) => {
    return res.status(201).json({user: req.user, msg: 'user fetched sucesfully'})
}

const logoutUser = async (req, res) => {
    const options = {
        httpOnly: true,
        secure: true
    }

    res.status(201)
    .clearCookie('acessToken', options)
    .json({msg:'user logged out sucesfully'})
}

export { registerUser, loginUser, getUser, logoutUser }