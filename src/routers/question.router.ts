import express from "express"

import authenticateToken from "../middlewares/auth/authenticateToken"
import {
  askNewQuestion,
  deleteQuestion,
  editQuestion,
  getAllQuestions,
  getSingleQuestion,
  likeQuestion,
} from "../controllers/question.controller"
import { checkQuestionExist } from "../middlewares/database/databaseErrorHelpers"
import getQuestionOwnerAccess from "../middlewares/auth/getQuestionOwnerAccess"

import answer from "./answer.router"

const router = express.Router()

router.post("/ask", authenticateToken, askNewQuestion)
router.get("/", getAllQuestions)
router.get("/:questionId", checkQuestionExist, getSingleQuestion)
router.get(
  "/:questionId/like",
  [authenticateToken, checkQuestionExist],
  likeQuestion
)
router.put(
  "/:questionId/edit",
  [authenticateToken, checkQuestionExist, getQuestionOwnerAccess],
  editQuestion
)
router.delete(
  "/:questionId/delete",
  [authenticateToken, checkQuestionExist, getQuestionOwnerAccess],
  deleteQuestion
)

router.use("/:questionId/answers", checkQuestionExist, answer)

export default router
