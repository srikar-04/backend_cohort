import mongoose, {Schema} from "mongoose";

//userId, completed, todo, 
const todoSchema = new Schema({
    completed: {
        type: Boolean
    },
    todo: {
        type: String
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true})

export const Todo = mongoose.model("Todo", todoSchema)