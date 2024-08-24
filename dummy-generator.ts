import Question from "./src/models/question.model"
import Answer from "./src/models/answer.model"
import User from "./src/models/user.model"
import fs from "fs"
import connectDatabase from "./src/helpers/database/connectDatabase"
import dotenv from "dotenv"

// Load environment variables
dotenv.config({
  path: "./src/config/env/config.env",
})

const path = "./src/dummy/"

const users = JSON.parse(fs.readFileSync(path + "users.json", "utf-8"))
const questions = JSON.parse(fs.readFileSync(path + "questions.json", "utf-8"))
const answers = JSON.parse(fs.readFileSync(path + "answers.json", "utf-8"))

connectDatabase()

const importAllData = async () => {
  try {
    await User.create(users)
    await Question.create(questions)
    await Answer.create(answers)
    console.log("Import Process Successful")
  } catch (err) {
    console.error("There is a problem with the import process", err)
  } finally {
    process.exit()
  }
}

const deleteAllData = async () => {
  try {
    await User.deleteMany()
    await Question.deleteMany()
    await Answer.deleteMany()
    console.log("Delete Process Successful")
  } catch (err) {
    console.error("There is a problem with the delete process", err)
  } finally {
    process.exit()
  }
}

if (process.argv[2] === "--import") {
  importAllData()
} else if (process.argv[2] === "--delete") {
  deleteAllData()
}
