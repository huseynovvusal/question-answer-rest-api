import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

import api from "./routes"
import connectDatabase from "./helpers/database/connectDatabase"
import errorHandler from "./middlewares/errors/errorHandler"

const app: Express = express()

// .env
dotenv.config({
  path: "./config/.env",
})

// Environment Variables
const PORT = process.env.PORT

// Middlewares
app.use(express.json())
app.use(cookieParser())

// Api Router
app.use("/api", api)

// Error Handles
app.use(errorHandler)

// DB
connectDatabase()

app.listen(PORT, () => {
  console.log(`Server is running at PORT:${PORT}`)
})
