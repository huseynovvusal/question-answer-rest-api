import { match } from "assert"
import mongoose, { Schema } from "mongoose"

const UserSchema: Schema = new Schema(
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
    },
    title: { type: String },
    about: { type: String },
    place: { type: String },
    website: { type: String },
    profile_image: { type: String, default: "default.jpg" },
    blocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

const User = mongoose.model("user", UserSchema)

export default User
