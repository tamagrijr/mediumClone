const express = require('express');
const { check } = require('express-validator');
const db = require('../../db/models');
const { Comment } = db;
const { asyncHandler, handleValidationErrors } = require('../../utils');
const router = express.Router();

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
  
)

module.exports = router;