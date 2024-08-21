import express from "express"
import {
  addNewAnswerToQuestion,
  getAllAnswersByQuestion,
  getSingleAnswer,
} from "../controllers/asnwer.controller"
import authenticateToken from "../middlewares/auth/authenticateToken"
import { checkQuestionAndAnswerExist } from "../middlewares/database/databaseErrorHelpers"

const router = express.Router({ mergeParams: true })

router.post("/", authenticateToken, addNewAnswerToQuestion)
router.get("/", getAllAnswersByQuestion)
router.get("/:answerId", checkQuestionAndAnswerExist, getSingleAnswer)

export default router
