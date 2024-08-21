import { NextFunction, Request, Response } from "express"
import asyncErrorWrapper from "express-async-handler"
import CustomError from "../../helpers/error/CustomError"
import Answer from "../../models/answer.model"
import { IAnswer } from "../../interfaces/answer"

const getAnswerOwnerAccess = asyncErrorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: userId } = (req as any).user
    const { answerId } = req.params

    const answer = (await Answer.findById(answerId)) as IAnswer

    if (answer.user != userId) {
      return next(
        new CustomError("Only the asnwer owner can handle this operation.", 403)
      )
    }

    next()
  }
)

export default getAnswerOwnerAccess
