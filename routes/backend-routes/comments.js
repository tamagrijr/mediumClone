const express = require('express');
const { check } = require('express-validator');
const db = require('../../db/models');
const { Comment } = db;
const {
  asyncHandler,
  handleValidationErrors,
  checkForStory,
  checkForUser,
  checkForComment,
  checkForContent
} = require('../../utils');
const router = express.Router();

const commentValidator = [
  check('body')
    .exists({
      checkNull: true,
      checkFalsy: true
    })
    .withMessage('Your comment must have a body')
];


// Post a new Comment to a Story by id
// MIRA Tested
router.post(
  '/stories/:id(\\d+)/comments',
  asyncHandler(checkForStory),
  asyncHandler(async (req, res) => {
    const { body, userId } = req.body;
    const comment = await Comment.create({ 
      body, userId, storyId: req.params.id });
    res.json(comment);
  })
);

// Update Comment by id
router.patch(
  '/comments/:id(\\d+)',
  asyncHandler(checkForComment),
  commentValidator,
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const { body } = req.body;
    const updatedComment = req.comment.update({ body });
    res.json(updatedComment);
  })
);

// Delete a Comment by id
router.delete(
  '/:id(\\d+)',
  asyncHandler(checkForComment),
  asyncHandler(async (req, res) => {
    await req.comment.destroy();
    res.status(204).end();
  })
);

// Get all Comments by a User by id
router.get('/users/:id(\\d+)/comments',
  asyncHandler(checkForUser),
  asyncHandler(async (req, res) => {
    const userComments = await Comment.findAll({
      where: { userId: req.params.id },
      include: Story
    });
    checkForContent(res, storyComments)
  }))

// Get all Comments for a Story by id
// MIRA Tested
router.get(
  '/stories/:id(\\d+)/comments',
  asyncHandler(checkForStory),
  asyncHandler(async (req, res) => {
    const storyComments = await Comment.findAll({
      where: { storyId: req.params.id }
    });
    checkForContent(res, storyComments)
  })
)

module.exports = router;