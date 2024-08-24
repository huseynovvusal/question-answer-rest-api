import { NextFunction, query, Request, Response } from "express"
import asyncErrorWrapper from "express-async-handler"
import Question from "../models/question.model"
import { IQuestion } from "../interfaces/question"
import CustomError from "../helpers/error/CustomError"

export const askNewQuestion = asyncErrorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const information = req.body

    const question = await Question.create({
      ...information,
      user: (req as any).user.id,
    })

    res.status(200).json({
      success: true,
      data: question,
    })
  }
)

export const getAllQuestions = asyncErrorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const search = req.query.search

    const populate = true
    const populateObject = {
      path: "user",
      select: "name profile_image",
    }

    let query = Question.find()

    if (search) {
      const titleRegex = new RegExp(search as string, "i")

      query = query.where({ title: titleRegex })
    }

    if (populate) query.populate(populateObject)

    // Pagination

    const page = parseInt((req.query.page || "1") as string)
    const limit = parseInt((req.query.limit || "5") as string)
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const total = await Question.countDocuments()

    const pagination: {
      previous?: {
        page: number
        limit: number
      }
      next?: {
        page: number
        limit: number
      }
    } = {}

    if (startIndex > 0) {
      pagination.previous = {
        page: page - 1,
        limit,
      }
    }

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      }
    }

    query = query.skip(startIndex).limit(limit)

    const questions = await query

    res.status(200).json({
      success: true,
      count: questions.length,
      data: questions,
      pagination,
    })
  }
)

export const getSingleQuestion = asyncErrorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      success: true,
      data: (req as any).question,
    })
  }
)

export const editQuestion = asyncErrorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { questionId } = req.params

    const { title, content } = req.body

    let question = (await Question.findById(questionId)) as IQuestion

    if (title) question.title = title
    if (content) question.content = content

    await question.save()

    res.status(200).json({
      success: true,
      data: question,
    })
  }
)

export const deleteQuestion = asyncErrorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { questionId } = req.params

    await Question.findByIdAndDelete(questionId)

    res.status(200).json({
      success: true,
      message: "Question is deleted successfully.",
    })
  }
)

export const likeQuestion = asyncErrorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { questionId } = req.params
    const userId = (req as any).user.id

    const question = (await Question.findById(questionId)) as IQuestion

    if (question.likes.includes(userId)) {
      const index = question.likes.indexOf((req as any).user.id)

      question.likes.splice(index, 1)
    } else {
      question.likes.push(userId)
    }

    await question.save()

    res.status(200).json({
      success: true,
      data: question,
    })
  }
)
