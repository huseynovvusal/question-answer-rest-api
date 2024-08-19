import { NextFunction, Request, Response } from "express"
import asyncErrorWrapper from "express-async-handler"
import User from "../models/user.model"
import { IUser } from "../interfaces/user"

export const blockUser = asyncErrorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params

    const user = (await User.findById(id)) as IUser

    user.blocked = !user.blocked

    await user.save()

    res.status(200).json({
      success: true,
      message: "Block - Unblock Successful",
    })
  }
)

export const deleteUser = asyncErrorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params

    const user = (await User.findById(id)) as IUser

    await user.deleteOne()

    res.status(200).json({
      success: true,
      message: "Delete Operation Successful",
    })
  }
)
