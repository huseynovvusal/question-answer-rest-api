import { NextFunction, Request, Response } from "express"
import asyncErrorWrapper from "express-async-handler"
import Question from "../models/question.model"

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
