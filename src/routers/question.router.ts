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
import questionQueryMiddleware from "../middlewares/query/questionQueryMiddleware"
import Question from "../models/question.model"
import answerQueryMiddleware from "../middlewares/query/answerQueryMiddleware"

const router = express.Router()

router.post("/ask", authenticateToken, askNewQuestion)

router.get(
  "/",
  questionQueryMiddleware(Question, {
    population: {
      path: "user",
      select: "name profile_image",
    },
  }),
  getAllQuestions
)

router.get(
  "/:questionId",
  checkQuestionExist,
  answerQueryMiddleware(Question, {
    population: [
      {
        path: "user",
        select: "name profile_image",
      },
      {
        path: "answers",
        select: "content",
      },
    ],
  }),
  getSingleQuestion
)
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
