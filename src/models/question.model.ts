import mongoose, { Schema } from "mongoose"
import slugify from "slugify"

import { IQuestion } from "../interfaces/question"

const QuestionSchema: Schema<IQuestion> = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please, provide a title."],
      minlength: [10, "Please, provide a title at least 10 characters."],
      maxlength: [100, "Please, provide a title with maximum 100 characters."],
      // unique: true, //? We check this in slug.
    },
    content: {
      type: String,
      required: [true, "Please, provide a content."],
      minlength: [30, "Please, provide a content at least 30 characters."],
    },
    slug: {
      type: String,
      unique: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "user",
    },
    likes: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "user",
      },
    ],
  },
  { timestamps: true }
)

// Methods
QuestionSchema.methods.makeSlug = function () {
  return slugify(this.title, {
    replacement: "-",
    remove: /[*+~.()'"!:@]/g,
    lower: true,
  })
}

// Hooks
QuestionSchema.pre("save", function (next) {
  if (!this.isModified("title")) return next()

  this.slug = this.makeSlug()

  next()
})

const Question = mongoose.model("question", QuestionSchema)

export default Question
