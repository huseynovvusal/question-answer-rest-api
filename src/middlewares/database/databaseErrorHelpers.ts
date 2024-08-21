import User from "../../models/user.model"
import asyncErrorWrapper from "express-async-handler"

import CustomError from "../../helpers/error/CustomError"
import { NextFunction, Request, Response } from "express"
import Question from "../../models/question.model"
import Answer from "../../models/answer.model"

export const checkUserExist = asyncErrorWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.params

    const user = await User.findById(id)

    if (!user) {
      return next(new CustomError("User is not found.", 400))
    }

    ;(req as any).user = user

    next()
  }
)

export const checkQuestionExist = asyncErrorWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { questionId } = req.params

    const question = await Question.findById(questionId)

    if (!question) {
      return next(new CustomError("Question is not found.", 400))
    }

    ;(req as any).question = question

    next()
  }
)

export const checkQuestionAndAnswerExist = asyncErrorWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { questionId, answerId } = req.params

    const answer = await Answer.findOne({
      _id: answerId,
      question: questionId,
    })

    if (!answer) {
      return next(new CustomError("Answer is not found.", 400))
    }

    ;(req as any).answer = answer

    next()
  }
)
