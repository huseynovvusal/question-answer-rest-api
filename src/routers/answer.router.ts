import express from "express"
import {
  addNewAnswerToQuestion,
  getAllAnswersByQuestion,
} from "../controllers/asnwer.controller"
import authenticateToken from "../middlewares/auth/authenticateToken"

const router = express.Router({ mergeParams: true })

router.post("/", authenticateToken, addNewAnswerToQuestion)
router.get("/", getAllAnswersByQuestion)

export default router
