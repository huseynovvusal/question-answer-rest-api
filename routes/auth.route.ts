import express, { Request, Response } from "express"
import {
  getUser,
  login,
  logout,
  register,
} from "../controllers/auth.controller"
import authenticateToken from "../middlewares/auth/authenticateToken"

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.get("/logout", authenticateToken, logout)

router.get("/profile", authenticateToken, getUser)

export default router
