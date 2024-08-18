import express from "express"

import auth from "./auth.router"
import questions from "./questions.router"
import user from "./user.router"

const router = express.Router()

// Api Routes
router.use("/auth", auth)
router.use("/questions", questions)
router.use("/users", user)

export default router
