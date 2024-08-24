import { NextFunction, Request, Response } from "express"
import asyncErrorWrapper from "express-async-handler"
import { Model, PopulateOptions } from "mongoose"

import { IQuestion } from "../../interfaces/question"
import {
  paginationHelper,
  populateHelper,
  questionSortHelper,
  searchHelper,
} from "./queryMiddlewareHelpers"
import Question from "../../models/question.model"

type AQMOptions = {
  population?: PopulateOptions | PopulateOptions[]
}

const answerQueryMiddleware = (
  model: Model<IQuestion>,
  options?: AQMOptions
) => {
  return asyncErrorWrapper(async function (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { questionId } = req.params

    const arrayName = "answers"

    const total = ((await model.findById(questionId)) as IQuestion)[
      "answerCount"
    ]

    const paginationResult = await paginationHelper(total, undefined, req)

    const { startIndex, limit } = paginationResult

    let queryObject: any = {}

    queryObject[arrayName] = { $slice: [startIndex, limit] }

    let query = model.find({ _id: questionId }, queryObject)

    if (options && options.population) {
      query = populateHelper<IQuestion, typeof query>(options.population, query)
    }
    const queryResults = await query

    ;(res as any).queryResult = {
      success: true,
      pagination: paginationResult.pagination,
      data: queryResults,
    }

    next()
  })
}

export default answerQueryMiddleware
