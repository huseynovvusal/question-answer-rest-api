import mongoose, { Schema } from "mongoose"

import { IQuestion } from "../interfaces/question"

const QuestionSchema: Schema<IQuestion> = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please, provide a title."],
      minlength: [10, "Please, provide a title at least 10 characters."],
      unique: true,
    },
    content: {
      type: String,
      required: [true, "Please, provide a content."],
      minlength: [30, "Please, provide a content at least 30 characters."],
    },
    slug: String,
    user: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "user",
    },
  },
  { timestamps: true }
)

const Question = mongoose.model("question", QuestionSchema)

export default Question
