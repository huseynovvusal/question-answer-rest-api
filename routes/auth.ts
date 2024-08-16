import express, { Request, Response } from "express"
import { register } from "../controllers/auth"

const router = express.Router()

router.get("/register", register)

export default router
