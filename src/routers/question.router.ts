import express from "express"
import authenticateToken from "../middlewares/auth/authenticateToken"
import {
  askNewQuestion,
  editQuestion,
  getAllQuestions,
  getSingleQuestion,
} from "../controllers/question.controller"
import { checkQuestionExist } from "../middlewares/database/databaseErrorHelpers"
import getQuestionOwnerAccess from "../middlewares/auth/getQuestionOwnerAccess"

const router = express.Router()

router.post("/ask", authenticateToken, askNewQuestion)
router.get("/", getAllQuestions)
router.get("/:id", checkQuestionExist, getSingleQuestion)
router.put(
  "/:questionId/edit",
  [authenticateToken, checkQuestionExist, getQuestionOwnerAccess],
  editQuestion
)

export default router
