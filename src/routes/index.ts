import express, { Request, Response } from "express"

import auth from "./auth.route"
import questions from "./questions.route"

const router = express.Router()

// Api Routes
router.use("/auth", auth)
router.use("/questions", questions)

export default router
