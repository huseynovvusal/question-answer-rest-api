import express from "express"
import { getAllUsers, getSingleUser } from "../controllers/user.controller"
import { checkUserExist } from "../middlewares/database/databaseErrorHelpers"
import userQueryMiddleware from "../middlewares/query/userQueryMiddleware"
import User from "../models/user.model"

const router = express.Router()

router.get("/:id", checkUserExist, getSingleUser)
router.get("/", userQueryMiddleware(User), getAllUsers)

export default router
