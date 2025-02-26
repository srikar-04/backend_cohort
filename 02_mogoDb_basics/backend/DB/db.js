// connecting to mongodb

import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.mongoURI}/todo-app-database`)
        console.log(`\n MongoDB connected!! DB Host ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log('MongoDB connection error', error);
        process.exit(1)
    }
}

export {connectDB}