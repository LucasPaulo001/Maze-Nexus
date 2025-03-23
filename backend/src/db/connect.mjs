import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const connectDB = async (app) => {
    await mongoose.connect(process.env.DB_URI)
    try{
        console.log('Conectado ao mongoose!')
    }
    catch(error){
        console.log(error)
    }
}

export default connectDB