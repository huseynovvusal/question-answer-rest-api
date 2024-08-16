const extractMongoServerError = (errorMessage: string) => {
  const splitted = errorMessage.split(".,")

  let errors: string[] = []

  for (let error of splitted) {
    const splittedError = error.split(": ")
    errors.push(splittedError[splittedError.length - 1])
  }

  return errors.join(". ")
}

export default extractMongoServerError
