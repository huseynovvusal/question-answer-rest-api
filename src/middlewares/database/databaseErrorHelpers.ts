import User from "../../models/user.model"
import asyncErrorWrapper from "express-async-handler"

import CustomError from "../../helpers/error/CustomError"
import { NextFunction, Request, Response } from "express"

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
