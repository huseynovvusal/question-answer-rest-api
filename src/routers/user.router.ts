import express from "express"
import { getAllUsers, getSingleUser } from "../controllers/user.controller"
import { checkUserExist } from "../middlewares/database/databaseErrorHelpers"

const router = express.Router()

router.get("/:id", checkUserExist, getSingleUser)
router.get("/", getAllUsers)

export default router
