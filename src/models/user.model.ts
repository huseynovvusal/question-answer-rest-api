import mongoose, { Schema } from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import { IUser } from "../interfaces/user"

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

const User = mongoose.model("user", UserSchema)

export default User
