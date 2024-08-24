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

type QQMOptions = {
  population?: PopulateOptions
}

const questionQueryMiddleware = (
  model: Model<IQuestion>,
  options?: QQMOptions | undefined
) => {
  return asyncErrorWrapper(async function (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    let query = model.find()

    query = searchHelper<IQuestion, typeof query>("title", query, req)

    if (options && options.population) {
      query = populateHelper<IQuestion, typeof query>(options.population, query)
    }

    query = questionSortHelper<typeof query>(query, req)

    const total = await model.countDocuments()

    const paginationResult = await paginationHelper<IQuestion, typeof query>(
      total,
      query,
      req
    )

    if (paginationResult.query) query = paginationResult.query
    const pagination = paginationResult.pagination

    const queryResults = await query

    ;(res as any).queryResult = {
      success: true,
      count: queryResults.length,
      pagination,
      data: queryResults,
    }

    next()
  })
}

export default questionQueryMiddleware
