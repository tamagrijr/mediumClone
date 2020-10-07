const express = require("express")
const {
  asyncHandler,
  checkForUser,
  userNotFound,
  checkForContent
} = require( "../../utils")
const { Follow, User } = require("../../db/models")
const followsRouter = express.Router()

// Get list of Followed Users for a User
// MIRA Tested 
followsRouter.get("/follows",
  asyncHandler(checkForUser),
  asyncHandler(async (req, res) => {
    const follows = await Follow.findAll({ 
      where: { followerId: req.params.id }
    })
    checkForContent(res, follows)
  })
)

// Get list of Followers for a User.
// MIRA Tested
followsRouter.get("/followers",
  asyncHandler(checkForUser),
  asyncHandler(async (req, res) => {
    const followers = await Follow.findAll({
      where: { followingId: req.params.id }
    })
    checkForContent(res, followers)
}))

// Add a Follow for a User.
// MIRA Tested
followsRouter.post("/follows", asyncHandler(checkForUser),
  asyncHandler(async (req, res, next) => {
  const newFollow = {
    followerId: req.params.id,
    followingId: req.body.followingId
  }
  const following = await User.findByPk(req.body.followingId)
  const followExists = await Follow.findOne({ where: newFollow })

  if (followExists) res.status(304).end()
  else if (req.params.id === req.body.followingId) res.status(304).end() // MIRA User can't follow self
  else if (!following) next(userNotFound(req.body.followingId))
  else {
    const follow = await Follow.create(newFollow)
    res.json(follow)
  }
}))

// Delete a Follow for a User.
// MIRA Tested
followsRouter.delete("/follows", asyncHandler(async (req, res) => {
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

module.exports = followsRouter