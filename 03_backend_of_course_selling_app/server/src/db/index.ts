import mongoose from 'mongoose'

export default async function connectDB(): Promise<void> {
    try 
    {

        const MONGO_URI = process.env.MONGODB_URI;
        const MONGO_DB_NAME = process.env.MONGODB_DB_NAME;

        if (!MONGO_URI || !MONGO_DB_NAME) {
            throw new Error("Missing MONGODB_URI or MONGODB_DB_NAME in environment variables");
        }

        const connectionInstance = await mongoose.connect(`${MONGO_URI}/${MONGO_DB_NAME}`)
        console.log('connectionInstance', connectionInstance)
        console.log('Data base connected successfully!!', connectionInstance.connection.host)

    } catch (error: unknown) {
        // This is the error which will be thrown when the "initial" connection is failed
        // When the initial connection is failed, mongoose will throw an error event and that is cathced here
        // During initial connection error, mongoose will not try to reconnect
        if (error instanceof Error) {
            console.error('Initial data base connection failed!! : ', error.message)
        } else {
            console.error('Initial data base connection failed!! : ', error)
        }
        process.exit(1)
    }
}

connectDB()

// the below two are the "post connection" errors
mongoose.connection.on('error', (err) => {
    console.error('Database connection error : ', err)
})

mongoose.connection.on('disconnected', () => {
    console.warn('Database disconnected!!')
})
