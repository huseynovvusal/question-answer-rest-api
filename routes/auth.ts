import express, { Request, Response } from "express"
import { register } from "../controllers/auth"
import authenticateToken from "../middlewares/auth/authenticateToken"

const router = express.Router()

router.get("/register", register)

router.get("/tokentest", authenticateToken, (req, res) => {
  res.json({ success: true })
})

export default router
