import { NextFunction, Request, Response } from "express"
import CustomError from "../../helpers/error/CustomError"
import extractMongooseError from "../../utils/error/extractMongooseError"

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let customError = err

  switch (err.name) {
    case "SyntaxError":
      customError = new CustomError("Unexpected Syntax", 400)
      break
    case "ValidationError":
      customError = new CustomError(extractMongooseError(err.message), 400)
      break
  }

  res.status(customError.status || 500).json({
    success: false,
    message: customError.message || "Internal Server Error",
  })
}

export default errorHandler
