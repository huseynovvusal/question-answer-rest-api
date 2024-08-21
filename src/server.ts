import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import path from "path"

import api from "./routers"
import connectDatabase from "./helpers/database/connectDatabase"
import errorHandler from "./middlewares/errors/errorHandler"

const app = express()

// .env
dotenv.config({
  path: path.join(__dirname, "config", ".env"),
})

// Environment Variables
const PORT = process.env.PORT
const NODE_ENV = process.env.NODE_ENV

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Static Files
app.use(express.static(path.join(__dirname, "public")))

// Api Router
app.use("/api", api)

// Error Handles
app.use(errorHandler)

// DB
connectDatabase()

app.listen(PORT, () => {
  console.log(`Server is running at PORT:${PORT} (${NODE_ENV})`)
})
