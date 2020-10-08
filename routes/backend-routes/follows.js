const express = require("express")
const {
  asyncHandler,
  checkForUser,
  contentNotFound,
  checkForContent
} = require("../../utils")
const { Follow, User } = require("../../db/models")
const followsRouter = express.Router()

// Get list of Followed Users for a User
// MIRA Tested
// Existing user and follows: gets list of followed users
// Non-existing user: 404 User not found
// Non-integer user: 404 Generic not found
// Existing user, no follows: 204
followsRouter.get("/:id(\\d+)/follows",
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
// Existing user and follows: gets list of user followers
// Existing user, no followers: 204
// Non-existing user: 404 user not found
// Non-integer user id: 404 generic not found
followsRouter.get("/:id(\\d+)/followers",
  asyncHandler(checkForUser),
  asyncHandler(async (req, res) => {
    const followers = await Follow.findAll({
      where: { followingId: req.params.id }
    })
    checkForContent(res, followers)
  }))

// Add a Follow for a User.
// MIRA Tested
// Existing user and followingId user: makes follow
// Non-existing user: 404 User not found
// Non-existing followingId user: 404 User not found
// Non-integer user id: 404 Generic Not Found
// Non-integer followingId user: 500 Server Error, invalid input syntax
// Existing user, no body: 500 Server Error, WHERE param 'followingid' is undefined
followsRouter.post("/:id(\\d+)/follows",
asyncHandler(checkForUser),
  asyncHandler(async (req, res, next) => {
    const newFollow = {
      followerId: req.params.id,
      followingId: req.body.followingId
    }
    const following = await User.findByPk(req.body.followingId)
    const followExists = await Follow.findOne({ where: newFollow })

    if (followExists) res.status(304).end() // MIRA Disallows dupes
    else if (req.params.id === req.body.followingId) res.status(304).end() // MIRA User can't follow self
    else if (!following) next(contentNotFound(req.body.followingId, "User"))
    else {
      const follow = await Follow.create(newFollow)
      res.json(follow)
    }
  })
)

// Delete a Follow for a User.
// MIRA Tested
// Existing follow: 204 deletes fol,low
// Non-existing user: 304
// Non-existing followingId user: 304
// Non-integer followingId user: 500 Server Error invalid input syntax
// Non-integer user: 404 generic not found
followsRouter.delete("/:id(\\d+)/follows",
  asyncHandler(async (req, res) => {
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
  })
)

module.exports = followsRouter