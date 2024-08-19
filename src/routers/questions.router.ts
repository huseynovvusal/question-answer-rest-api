import express, { Request, Response } from "express"
import authenticateToken from "../middlewares/auth/authenticateToken"
import { askNewQuestion } from "../controllers/question.controller"

const router = express.Router()

router.post("/ask", authenticateToken, askNewQuestion)

export default router
