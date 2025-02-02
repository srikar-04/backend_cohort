import mongoose, {Schema} from "mongoose";

// username, password, email
const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'username is required'],
    },
    password: {
        type: String,
        required: [true, 'password is required'],
    },
    email: {
        type: String,
        required: true,
        lowercase: [true, 'email is required']
    }
}, {timestamps: true})

export const User = mongoose.model("User", userSchema)