import { NextFunction, Request, Response } from "express"
import User from "../models/User"

import asyncErrorWrapper from "express-async-handler"

export const register = asyncErrorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body

    const user = await User.create({
      name,
      email,
      password,
    })

    res.json({
      success: true,
      user: user,
    })
  }
)
