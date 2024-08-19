import mongoose, { Document } from "mongoose"

export interface IQuestion extends Document {
  title: string
  content: string
  slug: string
  user: typeof mongoose.Schema.ObjectId
}
