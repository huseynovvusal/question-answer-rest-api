import express from "express"
import {
  addNewAnswerToQuestion,
  deleteAnswer,
  editAnswer,
  getAllAnswersByQuestion,
  getSingleAnswer,
  likeAnswer,
} from "../controllers/asnwer.controller"
import authenticateToken from "../middlewares/auth/authenticateToken"
import { checkQuestionAndAnswerExist } from "../middlewares/database/databaseErrorHelpers"
import getAnswerOwnerAccess from "../middlewares/auth/getAnswerOwnerAccess"

const router = express.Router({ mergeParams: true })

router.post("/", authenticateToken, addNewAnswerToQuestion)
router.get("/", getAllAnswersByQuestion)
router.get("/:answerId", checkQuestionAndAnswerExist, getSingleAnswer)
router.get(
  "/:answerId/like",
  [authenticateToken, checkQuestionAndAnswerExist],
  likeAnswer
)
router.put(
  "/:answerId/edit",
  [checkQuestionAndAnswerExist, authenticateToken, getAnswerOwnerAccess],
  editAnswer
)
router.delete(
  "/:answerId/delete",
  [checkQuestionAndAnswerExist, authenticateToken, getAnswerOwnerAccess],
  deleteAnswer
)

export default router
