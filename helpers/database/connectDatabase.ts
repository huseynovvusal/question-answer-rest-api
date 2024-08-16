import mongoose from "mongoose"
import dotenv from "dotenv"
import path from "path"

dotenv.config({
  path: path.resolve(__dirname, "../../config/.env"),
})

const MONGO_URI = process.env.MONGO_URI as string

const connectDatabase = () => {
  mongoose
    .connect(MONGO_URI)
    .then((value) => {
      console.log(`MongoDB Connection Successful: ${value.connection.host}`)
    })
    .catch((error) => {
      console.log("MongoDB Connection Error:", error)
      process.exit(1)
    })
}

export default connectDatabase
