import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./DB/db.js";
import cookieParser from "cookie-parser";
import cors from 'cors'
import { registerUser, loginUser, getUser, logoutUser } from "./controllers/user.controllers.js"
import { addTodo, deleteTodo, getTodos } from './controllers/todo.controllers.js'
import {verifyJwt} from './middlewares/authMiddleware.js'

const app = express();

// using middlewares
app.use(cors());
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true, limit: "56kb"}))
app.use(express.static("public"))

// requests
app.post("/signup", registerUser);

app.get('/getUser', verifyJwt, getUser)

app.post("/signin", loginUser);

app.post('/logout', verifyJwt, logoutUser)

app.post("/todos/addTodo", verifyJwt, addTodo);

app.delete("/todos/deleteTodo/:id", verifyJwt, deleteTodo);

app.get("/todos/getTodo", verifyJwt, getTodos);

app.post("/signiout", (req, res) => {});

// CONNECTING DB

connectDB()
.then(() => {
  app.listen(parseInt(process.env.PORT, 10), () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
})
.catch( (error) => {
    console.log("Failed to connect DB !!!", error);
})
