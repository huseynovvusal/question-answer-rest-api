import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"

import api from "./routes"
import connectDatabase from "./helpers/database/connectDatabase"

const app: Express = express()

// .env
dotenv.config({
  path: "./config/.env",
})

// Environment Variables
const PORT = process.env.PORT

// Middlewares
app.use(express.json())

// Api Router
app.use("/api", api)

// DB
connectDatabase()

app.listen(PORT, () => {
  console.log(`Server is running at PORT:${PORT}`)
})
