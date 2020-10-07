const express = require("express")
const {
  asyncHandler,
  checkForUser,
  checkForStory,
  checkForContent,
  userNotFound,
} = require("../../utils")
const { User, Like, Story } = require("../../db/models")
const router = express.Router()

// Add a Like to a Story by id
// MIRA Tested
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
    else if (!user) userNotFound(req.body.userId)
    else {
      const createdLike = await Like.create(newLike);
      res.json(createdLike);
    }
  })
);

// Delete a Like by Story and User ids
// MIRA Tested
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

// Get Likes by a User by id
router.get("/users/:id(\\d+)/likes",
  asyncHandler(checkForUser),
  asyncHandler(async (req, res) => {
    const userLikes = await Like.findAll({
      where: { userId: req.params.id },
      include: Story
    });
    checkForContent(userLikes)
  })
)

// Get Likes for a Story by id
router.get(
  '/stories/:id(\\d+)/likes',
  asyncHandler(checkForStory),
  asyncHandler(async (req, res) => {
    const likes = await Like.findAll({
      where: {
        storyId: req.params.id
      },
      include: User
    });

    const likeList = likes.map(like => {
      return {
        storyId: like.storyId,
        id: like.id,
        userId: like.userId,
        firstName: like.User.firstName,
        lastName: like.User.lastName
      }
    });
    checkForContent(likeList)
  })
);

module.exports = router