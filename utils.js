const { validationResult } = require("express-validator")


function asyncHandler(handler) {
  return (req, res, next) => {
    return handler(req, res, next).catch(next)
  }
}


function handleValidationErrors(req, res, next) {
  const validationErrors = validationResult(req)
  if (validationErrors.isEmpty()) next()
  const errors = validationErrors.array().map(error => error.msg)
  const err = Error("400: That is a bad request.")
  err.errors = errors
  err.status = 400
  err.title = "400 Bad Request"
  next(err)
}

module.exports = {
  asyncHandler,
  handleValidationErrors
}