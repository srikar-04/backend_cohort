import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./DB/db.js";
import cookieParser from "cookie-parser";
import cors from 'cors'
import { registerUser } from "./controllers/user.controllers.js"

const app = express();

// using middlewares
app.use(cors());
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true, limit: "56kb"}))
app.use(express.static("public"))

// requests
app.post("/signup", registerUser);

app.get('/', (req, res) => {
  res.send('you are in the right place')
})

app.post("/signin", (req, res) => {
  res.send("Hello World");
});

app.post("/todo", (req, res) => {});

app.get("/todos", (req, res) => {
  res.send('in the get todo section')
});

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
