import mongoose, { Document } from "mongoose"

export interface IAnswer extends Document {
  content: string
  user: typeof mongoose.Schema.ObjectId
  likes: (typeof mongoose.Schema.ObjectId)[]
  question: typeof mongoose.Schema.ObjectId
}
