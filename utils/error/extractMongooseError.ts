const extractMongooseError = (errorMessage: string) => {
  return errorMessage.split(": ")[2]
}

export default extractMongooseError
