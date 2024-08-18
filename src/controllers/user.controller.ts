import { NextFunction, Request, Response } from "express"
import asyncErrorWrapper from "express-async-handler"

import User from "../models/user.model"
import CustomError from "../helpers/error/CustomError"

export const getSingleUser = asyncErrorWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.params

    const user = await User.findById(id)

    if (!user) {
      return next(new CustomError("User is not found.", 400))
    }

    return res.status(200).json({
      success: true,
      data: user,
    })
  }
)
