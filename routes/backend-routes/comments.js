const express = require('express');
const { check } = require('express-validator');
const db = require('../../db/models');
const { Comment } = db;
const { asyncHandler, handleValidationErrors } = require('../../utils');
const router = express.Router();

const commentNotFoundError = id => {
  const err = new Error(`Coment id ${ id } could not be found!`);
  err.title = "Comment not found";
  err.status = 404;
  return err;
};

const commentValidator = [
  check('body')
    .exists({
      checkNull: true,
      checkFalsy: true
    })
    .withMessage('Your comment must have a body')
];

router.get(
  '/:userId(\\d+)',
  asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.userId);
    const userComments = await Comment.findAll({
      where: {
        userId
      }
    });

    res.json({ comments });
  })
);

router.put(
  '/comments/:id',
  commentValidator,
  handleValidationErrors,
  asyncHandler(async (req, res, next) => {
    const commentId = parseInt(req.params.id);
    const comment = await Comment.findByPk(commentId);

    const {
      body,
      userId,
      storyId
    } = req.body;

    if (comment) {
      const updatedComment = comment.update({ body, userId, storyId });
      res.json({ updatedComment });
    } else {
      next(commentNotFoundError(commentId));
    }
  })
);

module.exports = router;