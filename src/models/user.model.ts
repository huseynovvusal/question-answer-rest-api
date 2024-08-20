import mongoose, { Schema } from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import crypto from "crypto"

import { IUser } from "../interfaces/user"
import Question from "./question.model"

const UserSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please, provide a name."],
    },
    email: {
      type: String,
      required: [true, "Please, provide an email."],
      unique: true,
      match: [
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        "Please, provide a valid email.",
      ],
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    password: {
      type: String,
      minlength: [6, "Please, provide a password with minimum length 6."],
      required: [true, "Please, provide a password."],
      select: false,
    },
    title: String,
    about: String,
    place: String,
    website: String,
    profile_image: { type: String, default: "default.jpg" },
    blocked: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
)

// Methods
UserSchema.methods.generateJwt = function (): string {
  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string
  const JWT_EXPIRE = process.env.JWT_EXPIRE as string

  const payload = {
    id: this._id,
    name: this.name,
  }

  const token = jwt.sign(payload, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRE,
  })

  return token
}

UserSchema.methods.getResetPasswordToken = function (this: IUser): string {
  const RESET_PASSWORD_EXPIRE = process.env.RESET_PASSWORD_EXPIRE as string

  const randomHexString = crypto.randomBytes(15).toString("hex")

  const resetPasswordToken = crypto
    .createHash("SHA256")
    .update(randomHexString)
    .digest("hex")

  this.resetPasswordToken = resetPasswordToken
  this.resetPasswordExpire = new Date(
    Date.now() + parseInt(RESET_PASSWORD_EXPIRE)
  )

  return resetPasswordToken
}

// Hooks
UserSchema.pre<IUser>("save", function (next) {
  if (!this.isModified("password")) return next()

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)

    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err)

      this.password = hash

      next()
    })
  })
})

UserSchema.post(
  "deleteOne",
  { document: false, query: true },
  async function () {
    const query = this.getQuery()
    const userId = query._id

    if (userId) {
      console.log("deleteOne", userId)
      await Question.deleteMany({ user: userId })
    }
  }
)

const User = mongoose.model("user", UserSchema)

export default User
