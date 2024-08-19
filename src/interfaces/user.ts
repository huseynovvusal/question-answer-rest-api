import { Document } from "mongoose"

export interface IUser extends Document {
  name: string
  email: string
  role: "user" | "admin"
  password: string
  title: string
  about: string
  place: string
  website: string
  profile_image: string
  blocked: boolean
  resetPasswordToken?: string
  resetPasswordExpire?: Date

  generateJwt(): string
  getResetPasswordToken(): string
}

export interface IDetailsUpdateQuery {
  title?: string
  about?: string
  place?: string
  website?: string
}
