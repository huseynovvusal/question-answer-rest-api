import express from "express"
import authenticateToken from "../middlewares/auth/authenticateToken"
import getAdminAccess from "../middlewares/auth/getAdminAccess"
import { blockUser, deleteUser } from "../controllers/admin.controller"
import { checkUserExist } from "../middlewares/database/databaseErrorHelpers"

const router = express.Router()

router.use([authenticateToken, getAdminAccess])

router.get("/block/:id", checkUserExist, blockUser)
router.delete("/delete/user/:id", checkUserExist, deleteUser)

export default router
