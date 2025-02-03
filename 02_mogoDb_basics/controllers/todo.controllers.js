import { Todo } from "../models/todo.models.js";

const addTodo = async (req, res) => {
    const {content} = req.body
    let todo;
    try {
        todo = await Todo.create({
            completed: false,
            content,
            userId: req.user._id
        })
    } catch (error) {
        console.log('error while adding todo', error);
        return res.status(401).json({error: 'error while adding todo'})
    }

    if(!todo) {
        return res.status(401).json({error: 'todo doesnot exsists'})
    }

    return res.status(201).json({todo})
}

// const deleteTodo = async (req, res) => {
//     const id = req.user._id
// }

export { addTodo }