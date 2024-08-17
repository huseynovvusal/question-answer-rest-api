import { NextFunction, Request, Response } from "express"
import CustomError from "../../helpers/error/CustomError"
import extractMongoServerError from "../../utils/error/extractMongoServerError"
import { MongoServerError } from "mongodb"

const errorHandler = (
  err: CustomError | MongoServerError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let customError = err

  //? For fields which are unique
  if ("code" in err && err.code === 11000) {
    const mongoServerError = err as MongoServerError

    if (mongoServerError.keyPattern.email)
      customError = new CustomError(
        "This email has been used. Please, provide a different email.",
        409
      )
  }

  switch (err.name) {
    case "SyntaxError":
      customError = new CustomError("Unexpected Syntax", 400)
      break
    case "ValidationError":
      customError = new CustomError(extractMongoServerError(err.message), 400)
      break
  }

  res.status(customError.status || 500).json({
    success: false,
    message: customError.message || "Internal Server Error",
  })
}

export default errorHandler
