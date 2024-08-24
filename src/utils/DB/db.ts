import mongoose from 'mongoose'

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_URI!)
        console.log(`Successfully connectedd to MongoDB 🥂`)
    } catch (error:any) {
        console.error(`error : ${error.message}`)
        process.exit(1)
    }
}

export default connectDB
