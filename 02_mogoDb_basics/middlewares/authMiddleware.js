import jwt from 'jsonwebtoken'
import { User } from '../models/User.models.js'

export const verifyJwt = async (req, res, next) => {
    const token = req.cookies?.acessToken || req.header(Authorization)?.replace("Bearer ", "")
    

    if(!token) {
        return res.status(500).json({error: 'jwt token not found'})
    }
    // user token contains id and username

    const decodedToken = jwt.verify(token, process.env.ACESS_TOKEN_SECRET)

    let user
    try {
        user = await User.findById(decodedToken?._id)

        if(!user) {
            res.status(500).json({error: 'user not found in middleware'})
        }
    } catch (error) {
        console.log('error while getting user in auth middleware');
        return res.status(500).json({error: "error while getting user in auth middleware"})
    }

    req.user = user
    next()
}