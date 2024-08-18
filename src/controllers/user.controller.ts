import { NextFunction, Request, Response } from "express"
import asyncErrorWrapper from "express-async-handler"
import User from "../models/user.model"

export const getSingleUser = asyncErrorWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    return res.status(200).json({
      success: true,
      data: (req as any).user,
    })
  }
)

export const getAllUsers = asyncErrorWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const users = await User.find({})

    return res.status(200).json({
      success: true,
      data: users,
    })
  }
)
