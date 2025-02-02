import mongoose, {Schema} from "mongoose";

const todoSchema = new Schema({
    
}, {timestamps: true})

export const Todo = mongoose.model("Todo", todoSchema)