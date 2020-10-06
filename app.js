const express = require("express")
const environment = require("./config")
const indexRouter = require("./routes/index")
const usersRouter = require("./routes/backend-routes/users")
const storiesRouter = require("./routes/backend-routes/stories")
const commentsRouter = require("./routes/backend-routes/comments")
const app = express()
app.use(express.json())
app.set("view engine", "pug")

// Dev dependencies
const morgan = require("morgan")
app.use(morgan("dev"))


// Backend Routes
// app.use("api/", indexRouter)
app.use("/api/users", usersRouter)
app.use("/api/stories", storiesRouter)
app.use("/api/comments", commentsRouter)

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