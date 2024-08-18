import express, { Request, Response } from "express"
import {
  forgotPassword,
  getUser,
  login,
  logout,
  register,
  resetPassword,
} from "../controllers/auth.controller"
import authenticateToken from "../middlewares/auth/authenticateToken"
import profileImageUpload from "../middlewares/libraries/profileImageUpload"
import { uploadProfileImage } from "../controllers/auth.controller"

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.get("/logout", authenticateToken, logout)
router.post("/forgot-password", forgotPassword)
router.post(
  "/upload",
  [authenticateToken, (profileImageUpload as any).single("profile_image")],
  uploadProfileImage
)

router.put("/reset-password", resetPassword)

router.get("/profile", authenticateToken, getUser)

export default router
