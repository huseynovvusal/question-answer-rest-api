import express from "express"
import { getSingleUser } from "../controllers/user.controller"

const router = express.Router()

router.get("/:id", getSingleUser)

export default router
