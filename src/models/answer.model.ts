import mongoose, { CallbackError, Schema } from "mongoose"
import { IAnswer } from "../interfaces/answer"
import Question from "./question.model"
import { IQuestion } from "../interfaces/question"

const AnswerSchema: Schema<IAnswer> = new Schema(
  {
    content: {
      type: String,
      required: [true, "Please, provide a content."],
      minlength: [30, "Please, provide a content at least 30 characters."],
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
    question: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "question",
    },
  },
  { timestamps: true }
)

// Methods

// Hooks
AnswerSchema.pre<IAnswer>("save", async function (next) {
  if (!this.isModified("user")) return next()

  try {
    // const question = (await Question.findById(this.question)) as IQuestion

    // question.answers.push(this.id)

    // // !
    // console.log(question.answers)

    // question.answerCount = question.answers.length
    // await question.save()

    // ===========
    await Question.findByIdAndUpdate(this.question, {
      $push: { answers: this.id },
      $inc: { answerCount: 1 },
    })
    // ===========

    next()
  } catch (error) {
    return next(error as CallbackError)
  }
})

const Answer = mongoose.model("answer", AnswerSchema)

export default Answer
