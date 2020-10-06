const express = require('express');
const { check, validationResult } = require('express-validator');
const { asyncHandler, handleValidationErrors } = require('../../utils');
const db = require('../../db/models');
const { Story, Comment, Like } = db;

const router = express();

const storyValidations = [
  check('title')
    .exists({
      checkNull: true,
      checkFalsy: true
    })
    .withMessage('Your story must have a title')
    .length({ max: 255 })
    .withMessage('Your title may not be longer than 255 characters.'),
  check('body')
    .exists({
      checkNull: true,
      checkFalsy: true
    })
    .withMessage('Your story needs a body.'),
  check('userId')
    .exists({
      checkNull: true,
      checkFalsy: true
    })
    .withMessage('Your story must specify the author.')
]

router.get('/api/stories/:id', asyncHandler(async (req, res) => {
  const story = await Story.findByPk(req.params.id);
  res.json({ story });
}));



router.post(
  '/api/stories',
  storyValidations,
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const {
      title,
      body,
      authorId
    } = req.body;

    const story = await Story.create({ title, body, authorId });
    res.status(201).json({ story });
  })
);

module.exports = router;
