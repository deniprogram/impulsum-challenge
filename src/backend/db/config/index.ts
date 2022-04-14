import mongoose from 'mongoose'
const MongoDb = process.env.MONGODB_URI

if (!MongoDb) {
  throw new Error('Please add your Mongo URI to .env.local')
}

const connectDb = async () => {
  try {
    await mongoose.connect(MongoDb)
    console.log('DB CONNECTED: :)')
  } catch (err) {
    console.log('Error connecting to database: :(')
    console.log(err)
    process.exit(1)
  }
}

export default connectDb
