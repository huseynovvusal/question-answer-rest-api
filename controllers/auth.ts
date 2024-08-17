import { NextFunction, Request, Response } from "express"
import asyncErrorWrapper from "express-async-handler"
import bcrypt from "bcryptjs"

import User from "../models/User"
import { validateLoginInput } from "../helpers/auth/validateUserInput"
import CustomError from "../helpers/error/CustomError"

import dotenv from "dotenv"
import path from "path"

dotenv.config({
  path: path.resolve(__dirname, "../config/.env"),
})

const JWT_COOKIE = process.env.JWT_COOKIE as string
const NODE_ENV = process.env.NODE_ENV as string

export const register = asyncErrorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body

    const user = await User.create({
      name,
      email,
      password,
    })

    // TOKEN
    const token = user.generateJwt()

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

export const login = asyncErrorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body

    if (!validateLoginInput(email, password))
      next(new CustomError("PLease, check your inputs.", 400))

    const user = await User.findOne({ email })

    if (!user) return next(new CustomError("Invalid email or password.", 401))

    const isCorrectPassword = await bcrypt.compare(password, user.password)

    if (!isCorrectPassword)
      return next(new CustomError("Invalid email or password.", 401))

    // TOKEN
    const token = user.generateJwt()

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

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  res.json({
    success: true,
    data: {
      id: (req as any).user.id as any,
      name: (req as any).user.name as any,
    },
  })
}
