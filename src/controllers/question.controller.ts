import { NextFunction, Request, Response } from "express"
import asyncErrorWrapper from "express-async-handler"
import Question from "../models/question.model"
import { IQuestion } from "../interfaces/question"

export const askNewQuestion = asyncErrorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const information = req.body

    const question = await Question.create({
      ...information,
      user: (req as any).user.id,
    })

    res.status(200).json({
      success: true,
      data: question,
    })
  }
)

export const getAllQuestions = asyncErrorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const questions = await Question.find({})

    res.status(200).json({
      success: true,
      data: questions,
    })
  }
)

export const getSingleQuestion = asyncErrorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      success: true,
      data: (req as any).question,
    })
  }
)

export const editQuestion = asyncErrorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { questionId } = req.params

    const { title, content } = req.body

    let question = (await Question.findById(questionId)) as IQuestion

    if (title) question.title = title
    if (content) question.content = content

    await question.save()

    res.status(200).json({
      success: true,
      data: question,
    })
  }
)
