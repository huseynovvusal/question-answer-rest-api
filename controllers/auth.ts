import { NextFunction, Request, Response } from "express"
import asyncErrorWrapper from "express-async-handler"

import User from "../models/User"

export const register = asyncErrorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body

    const user = await User.create({
      name,
      email,
      password,
    })

    const token = user.generateJwt()

    const JWT_COOKIE = process.env.JWT_COOKIE as string
    const NODE_ENV = process.env.NODE_ENV as string

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + parseInt(JWT_COOKIE)),
        secure: NODE_ENV === "production",
      })
      .json({
        success: true,
        user: { ...(user as any)._doc, password: undefined, __v: undefined },
      })
  }
)
