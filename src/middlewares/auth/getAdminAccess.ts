import { NextFunction, Request, Response } from "express"
import asyncErrorWrapper from "express-async-handler"
import User from "../../models/user.model"
import CustomError from "../../helpers/error/CustomError"
import { IUser } from "../../interfaces/user"

const getAdminAccess = asyncErrorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = (req as any).user

    const user = (await User.findById(id)) as IUser

    if (user.role !== "admin") {
      return next(new CustomError("Only admins can access this route.", 403))
    }

    next()
  }
)

export default getAdminAccess
