import { NextFunction, Request, Response } from "express"
import asyncErrorWrapper from "express-async-handler"
import CustomError from "../../helpers/error/CustomError"
import Question from "../../models/question.model"

const getQuestionOwnerAccess = asyncErrorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: userId } = (req as any).user
    const { questionId } = req.params

    const question = await Question.findById(questionId)

    if (!question) {
      return next(new CustomError("Question is not found.", 404))
    }

    if (question.user != userId) {
      return next(
        new CustomError(
          "Only the question owner can handle this operation.",
          403
        )
      )
    }

    next()
  }
)

export default getQuestionOwnerAccess
