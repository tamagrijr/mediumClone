const bcrypt = require("bcryptjs")
const express = require("express")
const bearerToken = require("express-bearer-token")
const { check } = require("express-validator")
const { asyncHandler, handleValidationErrors } = require("../../utils")
const { makeUserToken, requireAuthentication } = require("../../auth")
const { User, Follow, Bookmark, Story, Like, Comment } = require("../../db/models")
const usersRouter = express.Router()

const userValidators = [
  // MIRA Tested
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("Please give us a first name.")
    .isLength({ min: 1, max: 40 })
    .withMessage("A first name must be between 1 to 40 characters in length."),
  // MIRA Tested
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Please give us a last name.")
    .isLength({ min: 0, max: 40 })
    .withMessage("A last name can't be longer than 40 characters in length."),
  // MIRA Tested
  check("email")
    .exists({ checkFalsy: true })
    .withMessage("Please give us a valid email.")
    .isEmail()
    .withMessage("Please give us a valid email.")
    .isLength({ max: 80 })
    .withMessage("An email can't be longer than 80 characters in length."),
  // MIRA Tested
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please give us a password.")
    .isLength({ min: 10, max: 80 })
    .withMessage("A password must be between 10 to 80 characters in length.")
]

// MIRA Tested
function userNotFound(id) {
  const err = new Error(`User with id ${id} doesn't exist.`)
  err.status = 404
  err.title = "404 User Not Found"
  return err
}

// Get User by id
// MIRA Tested
usersRouter.get("/:id", asyncHandler(async (req, res, next) => {
  const user = await User.findByPk(req.params.id)
  if (user) await res.json({ user })
  else next(userNotFound(req.params.id))
}))

// Delete User by id.
// MIRA Tested
usersRouter.delete("/:id", asyncHandler(async (req, res, next) => {
  const user = await User.findByPk(req.params.id)
  if (user) {
    await user.destroy()
    res.status(204).end()
  } else next(userNotFound(req.params.id))
}))

// Edit User data by id.
// MIRA Tested. Works even with omitted values like firstName, email
usersRouter.patch("/:id", asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email } = req.body
  // TODO MIRA How to handle changing passwords...
  console.log("user req body", req.body)
  const user = await User.findByPk(req.params.id)
  console.log("user", user)
  if (user) {
    await user.update({ firstName, lastName, email })
    await res.json({ user })
  } else {
    next(userNotFound(req.params.id))
  }
}))

usersRouter.get("/:id(\\d+)/stories", asyncHandler(async (req, res) => {
  const stories = await Story.findAll({
    where: {
      authorId: parseInt(req.params.id)
    }
  });
  if (stories.length) {
    res.json({ stories })
  } else {
    res.status(204).end()
  }
}))

// TODO MIRA How to handle changing passwords.

// Create a new User.
// TODO MIRA Add validations and validation handlers
usersRouter.post("/", userValidators, handleValidationErrors, asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body
  const hashedPassword = await bcrypt.hash(password, 10)
  const newUser = await User.create({
    firstName, lastName, email, hashedPassword
  })
  const token = makeUserToken(newUser) // TODO Implement auth AFTER routes.
  await res.status(201).json({ user: { id: newUser.id }, token })//TODO ADD TOKEN --
}))

// Create a new JWT token for a user on login(?)
usersRouter.post("/token", asyncHandler(async (req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne({ where: { email } })
  if (!user || !user.validatePassword(password)) { // MIRA Add to User model?
    const err = new Error("The login failed.")
    err.status = 401;
    err.title = "401 Login Failed"
    err.errors = "The provided credentials are INVALID."
    return next(err)
  }
  const token = makeUserToken(user)
  await res.json({ token, user: { id: user.id } })
}))

// Get list of Followed Users for a User
// MIRA Tested
usersRouter.get("/:id(\\d+)/follows", asyncHandler(async (req, res, next) => {
  const user = await User.findByPk(req.params.id)
  if (user) {
    // console.log("USER USER USER ", user)
    const follows = await Follow.findAll({
      where: { followerId: req.params.id }
    })
    res.json({ follows })
  } else next(userNotFound(req.params.id))
}))

// Get list of Followers for a User.
// MIRA Tested
usersRouter.get("/:id(\\d+)/followers", asyncHandler(async (req, res, next) => {
  const user = await User.findByPk(req.params.id)
  if (user) {
    const followers = await Follow.findAll({
      where: { followingId: req.params.id }
    })
    res.json({ followers })
  } else next(userNotFound(req.params.id))
}))

// Add a Follow for a User.
// MIRA Tested
usersRouter.post("/:id(\\d+)/follows", asyncHandler(async (req, res) => {
  const newFollow = {
    followerId: req.params.id,
    followingId: req.body.followingId
  }
  const follower = await User.findByPk(req.params.id)
  const following = await User.findByPk(req.body.followingId)
  const followExists = await Follow.findOne({ where: newFollow })

  if (followExists || req.params.id === req.body.followingId) { // MIRA User can't follow self.
    res.status(304).end()
  }
  else if (!follower) next(userNotFound(req.params.id))
  else if (!following) next(userNotFound(req.body.followingId))
  else {
    const follow = await Follow.create(newFollow)
    res.json({ follow })
  }
}))

// Delete a Follow for a User.
// MIRA Tested
usersRouter.delete("/:id(\\d+)/follows", asyncHandler(async (req, res) => {
  const follow = await Follow.findOne({
    where: {
      followerId: req.params.id,
      followingId: req.body.followingId
    }
  })
  if (follow) {
    await follow.destroy()
    res.status(204).end()
  } else {
    res.status(304).end()
  }
}))


// Get list of Bookmarked Stories for a User
// MIRA Tested
usersRouter.get("/:id(\\d+)/bookmarks", asyncHandler(async (req, res, next) => {
  const user = await User.findByPk(req.params.id)
  if (user) {
    const bookmarks = await Bookmark.findAll({
      where: { userId: req.params.id }
    })
    await res.json({ bookmarks })
  } else {
    next(userNotFound(req.params.id))
  }
}))

const storyNotFound = id => {
  const err = new Error(`Story id ${id} could not be found!`);
  err.title = "Story not found";
  err.status = 404;
  return err;
}

// Create a Bookmark to a Story for a User
// MIRA Tested
usersRouter.post("/:id(\\d+)/bookmarks", asyncHandler(async (req, res, next) => {
  const newBookmark = { userId: req.params.id, storyId: req.body.storyId }
  const bookmarkExists = await Bookmark.findOne({ where: newBookmark })
  const user = await User.findByPk(req.params.id)
  const story = await Story.findByPk(req.body.storyId)

  if (bookmarkExists) res.status(304).end()
  else if (!user) next(userNotFound(req.params.id))
  else if (!story) next(storyNotFound(req.body.storyId))
  else {
    const bookmark = await Bookmark.create(newBookmark)
    res.json({ bookmark })
  }
}))

// Delete a Bookmark to a Story for a User
// MIRA Tested
usersRouter.delete("/:id(\\d+)/bookmarks",
  asyncHandler(async (req, res, next) => {
    const bookmark = await Bookmark.findOne({
      where: {
        userId: req.params.id,
        storyId: req.body.storyId
      }
    })
    if (bookmark) {
      await bookmark.destroy()
      res.status(204).end()
    } else  res.status(304).end()
  })
)
usersRouter.get("/:id(\\d+)/likes", asyncHandler(async (req, res) => {
  const userId = parseInt(req.params.id);
  const userLikes = await Like.findAll({
    where: { userId },
    include: Story
  });
  await res.json({ userLikes });
}))

// Get comments by a user
usersRouter.get('/:userId(\\d+)/comments',
  asyncHandler(async (req, res) => {
    const userComments = await Comment.findAll({
      where: { userId },
      include: Story
    });
    res.json({ userComments });
  })
);

module.exports = usersRouter
