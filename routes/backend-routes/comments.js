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



router.patch(
  '/comments/:id',
  commentValidator,
  handleValidationErrors,
  asyncHandler(async (req, res, next) => {
    const commentId = parseInt(req.params.id);
    const comment = await Comment.findByPk(commentId);

    const {
      body
    } = req.body;

    if (comment) {
      const updatedComment = comment.update({ body });
      res.json({ updatedComment });
    } else {
      next(commentNotFoundError(commentId));
    }
  })
);

router.delete(
  '/comments/:id',
  asyncHandler(async (req, res, next) => {
    const commentId = parseInt(req.params.id);
    const comment = await Comment.findByPk(commentId);

    if (comment) {
      await comment.destroy();
      res.status(204).end();
    } else {
      res.status(304).end();
    }
  })
);

module.exports = router;