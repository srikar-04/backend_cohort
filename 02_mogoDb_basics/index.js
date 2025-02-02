import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./DB/db.js";
import cookieParser from "cookie-parser";
import cors from 'cors'

const app = express();

// using middlewares
app.use(cors());
app.use(cookieParser())
app.use(express.json())

// requests
app.post("/signup", (req, res) => {
  res.send("Hello World");
});

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
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
})
.catch( (error) => {
    console.log("Failed to connect DB !!!", error);
})
