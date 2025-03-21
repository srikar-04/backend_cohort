import dotenv from 'dotenv'
dotenv.config()
import express from 'express'

import connectDB from './db/index'

const app = express()
const PORT = process.env.PORT || 5000


connectDB()
.then(() => {
    app.on('error', (err) => {
        console.error("Error in the server : ", err)
        throw err
    })

    app.listen(PORT, () => {
        console.log(`Server is running on PORT : ${PORT}`)
    })
})
.catch((err) => {
    console.error("MongoDB Connection failed: ", err)
    process.exit(1)
})



// middlewares
