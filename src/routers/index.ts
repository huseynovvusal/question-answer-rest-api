import express from "express"

import auth from "./auth.router"
import questions from "./question.router"
import user from "./user.router"
import admin from "./admin.router"

const router = express.Router()

// Api Routes
router.use("/auth", auth)
router.use("/questions", questions)
router.use("/users", user)
router.use("/admin", admin)

export default router
