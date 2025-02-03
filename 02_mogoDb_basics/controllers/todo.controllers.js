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

const deleteTodo = async (req, res) => {
    const userId = req.user._id
    const {id} = req.params
    console.log(id, 'this is todoId from body');
    console.log(userId, 'this is userid from db');

    try {
        const deletedTodo = await Todo.findOneAndDelete({_id: id, userId})

        if(!deletedTodo) {
            return res.status(401).json({error: 'todo doesnot exsists'})
        }
    } catch (error) {
        console.log('error while deleting todo', error);
        return res.status(401).json({error: 'error while deleting todo'})
    }

    res.status(201).json({msg: 'sucesfully deleted todo'})
}

const getTodos = async (req, res) => {
    let todos
    try {
        todos = await Todo.find({userId: req.user._id});
        if(!todos && !(todos.length>0)) return res.status(500).json({error: 'todos doesnot exsists'})
    } catch (error) {
        console.log('error while getting fetching todos', error);
        return res.status(401).json({error: 'error while fetching todos'})
    }
    return res.status(201).send(todos)
}

const updateTodo = async (req, res) => {
    const userId = req.user._id 
    const {updatedContent, id} = req.body

    let updatedTodo
   try {
            updatedTodo = await Todo.findOneAndUpdate(
            {_id: id,userId},
            { content: updatedContent, completed: false },
            { new: true }
        )
        console.log(updatedTodo, 'this is the updated todo');
        if(!updatedTodo) {
            return res.status(500).json({error: 'failed to update todo'})
        }
   } catch (error) {
        console.log('error while updating todo', error);
        return res.status(500).json({error: 'error while updating todo'})
   }
   res.status(201).send(updatedTodo)
}

export { addTodo, deleteTodo, getTodos, updateTodo }