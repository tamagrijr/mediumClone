const { validationResult } = require("express-validator")


function asyncHandler(handler) {
  return (req, res, next) => {
    return handler(req, res, next).catch(next)
  }
}


<<<<<<< HEAD
function handleValidationErrors(req, res, next) {
  const validationErrors = validationResult(req)
  if (validationErrors.isEmpty()) next()
  else {
    const errors = validationErrors.array().map(error => error.msg)
    const err = Error("400: That is a bad request.")
    err.errors = errors
    err.status = 400
    err.title = "400 Bad Request"
    next(err)
  }
}
=======
const handleValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map(error => error.msg);
    const err = Error("Bad request.");      err.errors = errors;
    err.status = 400;
    err.title = "Bad request.";
    return next(err);
  }
  next();
};
>>>>>>> 0b4eca6597533f25a69cbeab4d466383cb8dc7a3

module.exports = {
  asyncHandler,
  handleValidationErrors
}
