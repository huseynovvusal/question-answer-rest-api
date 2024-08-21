import express from "express"
import {
  addNewAnswerToQuestion,
  editAnswer,
  getAllAnswersByQuestion,
  getSingleAnswer,
} from "../controllers/asnwer.controller"
import authenticateToken from "../middlewares/auth/authenticateToken"
import { checkQuestionAndAnswerExist } from "../middlewares/database/databaseErrorHelpers"
import getAnswerOwnerAccess from "../middlewares/auth/getAnswerOwnerAccess"

const router = express.Router({ mergeParams: true })

router.post("/", authenticateToken, addNewAnswerToQuestion)
router.get("/", getAllAnswersByQuestion)
router.get("/:answerId", checkQuestionAndAnswerExist, getSingleAnswer)
router.put(
  "/:answerId/edit",
  [checkQuestionAndAnswerExist, authenticateToken, getAnswerOwnerAccess],
  editAnswer
)

export default router
