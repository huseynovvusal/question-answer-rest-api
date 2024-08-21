import { NextFunction, Request, Response } from "express"
import asyncErrorWrapper from "express-async-handler"
import Answer from "../models/answer.model"
import CustomError from "../helpers/error/CustomError"
import Question from "../models/question.model"
import { IQuestion } from "../interfaces/question"

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
