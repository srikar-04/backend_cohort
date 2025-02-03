import mongoose, {Schema} from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// username, password, email
const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'username is required'],
        unique: [true, 'username already exsists']
    },
    password: {
        type: String,
        required: [true, 'password is required'],
    },
    email: {
        type: String,
        required: true,
        lowercase: [true, 'email is required'],
        unique: [true, 'email already exsists']
    }
}, {timestamps: true})

userSchema.pre("save", async function(next) {

    if(!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password, 10)

    next()
})

userSchema.methods.isPasswordCorrect = async function(password) {
    return bcrypt.compare(password, this.password)
}

userSchema.methods.generateAcessToken = async function() {
    return jwt.sign(
        {_id: this._id, username: this.username},
        process.env.ACESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACESS_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)