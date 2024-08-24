import { NextFunction, Request, Response } from "express"
import asyncErrorWrapper from "express-async-handler"
import { Model } from "mongoose"

import {
  paginationHelper,
  populateHelper,
  searchHelper,
} from "./queryMiddlewareHelpers"
import { IUser } from "../../interfaces/user"
import User from "../../models/user.model"

const userQueryMiddleware = (model: Model<IUser>) => {
  return asyncErrorWrapper(async function (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    let query = model.find()

    query = searchHelper<IUser, typeof query>("name", query, req)

    const paginationResult = await paginationHelper<IUser, typeof query>(
      User,
      query,
      req
    )

    query = paginationResult.query
    const pagination = paginationResult.pagination

    const queryResults = await query

    ;(req as any).queryResult = {
      success: true,
      count: queryResults.length,
      pagination,
      data: queryResults,
    }

    next()
  })
}

export default userQueryMiddleware
