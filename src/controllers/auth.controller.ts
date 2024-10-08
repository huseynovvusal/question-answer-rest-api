import { NextFunction, Request, Response } from "express"
import asyncErrorWrapper from "express-async-handler"
import bcrypt from "bcryptjs"

import User from "../models/user.model"
import { validateLoginInput } from "../helpers/auth/validateUserInput"
import CustomError from "../helpers/error/CustomError"

import dotenv from "dotenv"
import path from "path"
import { IDetailsUpdateQuery, IUser } from "../interfaces/user"
import sendEmail from "../helpers/libraries/sendEmail"
import { resetPasswordEmailTemplate } from "../templates/email.template"

dotenv.config({
  path: path.join(__dirname, "../config/.env"),
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
      .status(201)
      .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + parseInt(JWT_COOKIE)),
        secure: NODE_ENV === "production",
      })
      .json({
        success: true,
        user: { ...(user as any)._doc, password: undefined },
      })
  }
)

export const login = asyncErrorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body

    if (!validateLoginInput(email, password))
      next(new CustomError("PLease, check your inputs.", 400))

    const user = await User.findOne({ email }).select("+password")

    if (!user) return next(new CustomError("Wrong email or password.", 401))

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
        user: { ...(user as any)._doc, password: undefined },
      })
  }
)

export const logout = asyncErrorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).clearCookie("access_token").json({
      success: true,
      message: "Logged out successfully.",
    })
  }
)

export const uploadProfileImage = asyncErrorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { savedProfileImage } = req as any
    const { id } = (req as any).user

    const user = await User.findByIdAndUpdate(
      id,
      {
        profile_image: savedProfileImage,
      },
      { new: true, runValidators: true }
    )

    res.status(200).json({
      success: true,
      message: "Profile image is uploaded successfully.",
      user: (user as any)._doc,
    })
  }
)

export const forgotPassword = asyncErrorWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const SMTP_USER = process.env.SMTP_USER as string

    const { resetEmail } = req.body

    const user: IUser | null = await User.findOne({ email: resetEmail })

    if (!user) {
      return next(new CustomError("There is no user with that email.", 400))
    }

    const resetPasswordToken = user.getResetPasswordToken()

    await user.save()

    const resetPasswordUrl = `httpL//localhost:5000/api/auth/reset-password?resetPasswordToken=${resetPasswordToken}`

    const emailTemplate = resetPasswordEmailTemplate(resetPasswordUrl)

    try {
      await sendEmail({
        from: SMTP_USER,
        to: resetEmail,
        subject: "Reset Your Password",
        html: emailTemplate,
      })

      return res.status(200).json({
        success: true,
        message: "Token is sent to your email address.",
      })
    } catch (error) {
      user.resetPasswordToken = undefined
      user.resetPasswordExpire = undefined

      await user.save()

      return next(new CustomError("Email could not be sent", 500))
    }
  }
)

export const resetPassword = asyncErrorWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { resetPasswordToken } = req.query
    const { password } = req.body

    if (!resetPassword) {
      return next(new CustomError("Please, provide a valid token.", 400))
    }

    let user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    })

    if (!user) {
      return next(new CustomError("Please, provide a valid token.", 400))
    }

    user.password = password
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save()

    res.status(200).json({
      success: true,
      message: "Password is updated successfully.",
    })
  }
)

export const editDetails = asyncErrorWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { title, about, place, website } = req.body

    const updateQuery: IDetailsUpdateQuery = {}

    if (title) updateQuery.title = title
    if (about) updateQuery.about = about
    if (place) updateQuery.place = place
    if (website) updateQuery.website = website

    const user = await User.findByIdAndUpdate(
      (req as any).user.id,
      updateQuery,
      {
        new: true,
        runValidators: true,
      }
    )

    res.status(200).json({
      success: true,
      message: "Profile is updated successfully.",
      // data: user,
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
