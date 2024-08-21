import express from "express"
import { addNewAnswerToQuestion } from "../controllers/asnwer.controller"
import authenticateToken from "../middlewares/auth/authenticateToken"

const router = express.Router({ mergeParams: true })

router.post("/", authenticateToken, addNewAnswerToQuestion)

export default router
