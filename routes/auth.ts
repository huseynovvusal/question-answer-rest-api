import express, { Request, Response } from "express"
import { getUser, login, register } from "../controllers/auth"
import authenticateToken from "../middlewares/auth/authenticateToken"

const router = express.Router()

router.post("/register", register)
router.post("/login", login)

router.get("/profile", authenticateToken, getUser)

export default router
