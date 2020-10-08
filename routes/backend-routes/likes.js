const express = require("express")
const {
  asyncHandler,
  checkForUser,
  checkForStory,
  checkForContent,
  contentNotFound,
} = require("../../utils")
const { User, Like, Story } = require("../../db/models")
const router = express.Router()

// Get Likes by a User by id
// Existing user: Gets list of Likes with all associated Story info
// Existing user, no likes: 204
// Non-existing user: 404 User Not Found
// Non-integer user id: 404 Generic Not Found
router.get("/users/:id(\\d+)/likes",
  asyncHandler(checkForUser),
  asyncHandler(async (req, res) => {
    const userLikes = await Like.findAll({
      where: { userId: req.params.id },
      include: Story
    });
    checkForContent(res, userLikes)
  })
)

// Get Likes for a Story by id
// Existing story: gets list of likes without sensitive User info
// Existing story, no likes: 204
// Non-existing story: 404 Story Not Found
// Non-integer story id: 404 Generic Not Found
router.get(
  '/stories/:id(\\d+)/likes',
  asyncHandler(checkForStory),
  asyncHandler(async (req, res) => {
    const likes = await Like.findAll({
      where: { storyId: req.params.id },
      include: User
    });
    const likeList = likes.map(like => { // MIRA Do we need to return all this information? Can we not just return the likes themselves?
      return {
        id: like.id,
        storyId: like.storyId,
        user: {
          userId: like.userId,
          firstName: like.User.firstName,
          lastName: like.User.lastName
        }
      }
    });
    checkForContent(res, likeList)
  })
);

// Add a Like to a Story by id
// MIRA Tested
// 
router.post(
  '/stories/:id(\\d+)/likes',
  asyncHandler(checkForStory),
  asyncHandler(async (req, res) => {
    const user = await User.findByPk(req.body.userId)
    const newLike = {
      userId: req.body.userId,
      storyId: req.params.id
    }
    const likeExists = await Like.findOne({ where: newLike });
    if (likeExists) res.status(304).end();
    else if (!user) contentNotFound(req.body.userId, "User")
    else {
      const createdLike = await Like.create(newLike);
      res.json(createdLike);
    }
  })
);

// Delete a Like by Story and User ids
// MIRA Tested
// Existing like: 204, deletes like
// Existing story, no body: 500 Server Error, WHERE params userId has undefined
// Non-existing story: 500 Server Error, WHERE params userId has undefined
// Empty userId value: 500 Server Error, invalid input syntax
// Non-integer userId value: 500 Server Error, invalid input syntax
// Non-existing userId value: 304
router.delete(
  '/stories/:id(\\d+)/likes',
  asyncHandler(async (req, res) => {
    const like = await Like.findOne({
      where: {
        storyId: req.params.id,
        userId: req.body.userId
      }
    });
    if (like) {
      await like.destroy();
      res.status(204).end();
    } else {
      res.status(304).end();
    }
  })
);

module.exports = router