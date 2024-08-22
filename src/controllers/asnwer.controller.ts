import { NextFunction, Request, Response } from "express"
import asyncErrorWrapper from "express-async-handler"
import Answer from "../models/answer.model"
import CustomError from "../helpers/error/CustomError"
import Question from "../models/question.model"
import { IQuestion } from "../interfaces/question"
import { IAnswer } from "../interfaces/answer"

export const addNewAnswerToQuestion = asyncErrorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { questionId } = req.params

    const userId = (req as any).user.id

    const { content } = req.body

    const answer = await Answer.create({
      content,
      question: questionId,
      user: userId,
    })

    res.status(200).json({
      success: true,
      data: answer,
    })
  }
)

export const getAllAnswersByQuestion = asyncErrorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { questionId } = req.params

    const question = (await Question.findById(questionId).populate(
      "answers"
    )) as IQuestion

    const answers = question.answers

    res.status(200).json({
      success: true,
      data: answers,
      count: answers.length,
    })
  }
)

export const getSingleAnswer = asyncErrorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const answerId = (req as any).answer._id

    const answer = await Answer.findById(answerId)
      .populate({
        path: "question",
        select: "title",
      })
      .populate({
        path: "user",
        select: "name profile_image",
      })

    res.status(200).json({
      success: true,
      data: answer,
    })
  }
)

export const editAnswer = asyncErrorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const answerId = (req as any).answer._id
    const { content } = req.body

    const answer = (await Answer.findById(answerId)) as IAnswer

    answer.content = content

    await answer.save()

    res.status(200).json({
      success: true,
      data: answer,
    })
  }
)

export const deleteAnswer = asyncErrorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const answerId = (req as any).answer._id
    const { questionId } = req.params

    await Answer.findByIdAndDelete(answerId)

    const question = (await Question.findById(questionId)) as IQuestion

    question.answers.splice(question.answers.indexOf(answerId), 1)

    await question.save()

    res.status(200).json({
      success: true,
      message: "Answer is deleted successfully.",
    })
  }
)
