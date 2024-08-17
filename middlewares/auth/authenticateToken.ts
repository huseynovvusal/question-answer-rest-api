import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

import CustomError from "../../helpers/error/CustomError"

import dotenv from "dotenv"
import path from "path"

dotenv.config({
  path: path.resolve(__dirname, "../../config/.env"),
})

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  if (!req.cookies.access_token) {
    return next(
      new CustomError("You are not authorized to access this route.", 403)
    )
  }

  const accessToken = req.cookies.access_token

  jwt.verify(accessToken, JWT_SECRET_KEY, (err: any, decoded: any) => {
    if (err) {
      return next(
        new CustomError("You are not authorized to access this route.", 401)
      )
    }

    console.log(decoded) //? Works
    ;(req as any).user = {
      id: decoded.id,
      name: decoded.name,
    }
  })

  next()
}

export default authenticateToken
