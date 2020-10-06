const express = require("express")
const environment = require("./config")
const indexRouter = require("./routes/backend-routes/index")
const usersRouter = require("./routes/backend-routes/users")
const storiesRouter = require("./routes/backend-routes/stories")
const frontEndRouter = require("./routes/frontEndRoutes")

const app = express()
app.set("view engine", "pug")
app.use(express.json())

// Dev dependencies
const morgan = require("morgan")
app.use(morgan("dev"))

// Backend Routes
// app.use("api/", indexRouter)
app.use("api/users", usersRouter)
app.use("api/stories", storiesRouter)
app.use(frontEndRouter)

// 404 Catch unhandled requests
app.use((req, res, next) => {
  const err = new Error("404 We couldn't find that page.")
  err.status = 404
  next(err)
})

// Custom error handlers


// Generic fallback error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  const isProductionEnv = environment === "production"
  res.json({
    title: err.title || "500 Server Error",
    message: err.message,
    errors: err.errors,
    stack: isProductionEnv ? null : err.stack,
  })
})

module.exports = app