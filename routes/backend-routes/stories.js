const express = require('express');
const { check, validationResult } = require('express-validator');
const { asyncHandler, handleValidationErrors } = require('../../utils');
const db = require('../../db/models');
const { noExtendLeft } = require('sequelize/types/lib/operators');
const { Story, Comment, Like } = db;

const router = express();

const storyNotFoundError = id => {
  const err = new Error(`Story id ${ id } could not be found!`);
  err.title = "Story not found";
  err.status = 404;
  return err;
};

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

router.get('/api/stories/:id(\\d+)', asyncHandler(async (req, res, next) => {
  const storyId = parseInt(req.params.id);
  const story = await Story.findByPk(storyId);

  if (story) {
    res.json({ story });
  } else {
    next(storyNotFoundError(storyId));
  }
}));

router.get(
  '/api/stories/:id(\\d+)/comments',
  asyncHandler(async (req, res, next) => {
    const storyId = parseInt(req.params.id);
    const comments = await Comment.findAll({
      where: {
        storyId: storyId
      }
    });

    if (comments) {
      res.json({ comments });
    } else {
      const story = await Story.findByPk(storyId);
      if (story) {
        // TODO: Discuss with group what to do when no comments are found for the story
        res.status(204).end();
      } else {
        next(storyNotFoundError(storyId));
      }
    }
  })
);

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

router.put(
  '/stories/:id(\\d+)',
  storyValidations,
  handleValidationErrors,
  asyncHandler(async (req, res, next) => {
    const storyId = parseInt(req.params.id);
    const story = await Story.findByPk(storyId);

    const {
      title,
      body,
      authorId
    } = req.body;

    if (story) {
      const updatedStory = await story.update({ title, body, authorId });
      res.json({ updatedStory });
    } else {
      next(storyNotFoundError(storyId));
    }
  })
);


router.delete(
  '/stories/:id(\\d+)',
  asyncHandler(async (req, res, next) => {
    const storyId = parseInt(req.params.id);
    const story = await Story.findByPk(storyId);

    if (story) {
      await story.destroy();
      res.status(204).end();
    } else {
      next(storyNotFoundError(storyId));
    }
  })
);

module.exports = router;
