import { NextFunction, Request, Response } from "express"
import asyncErrorWrapper from "express-async-handler"
import Answer from "../models/answer.model"
import CustomError from "../helpers/error/CustomError"

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
