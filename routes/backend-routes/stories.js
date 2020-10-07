const express = require('express');
const { check } = require('express-validator');
const {
  asyncHandler,
  handleValidationErrors,
  checkForStory,
  deleteForStory } = require('../../utils');
const db = require('../../db/models');
const { Story, Comment, Like, Bookmark } = db;

const router = express.Router();

const authorValidation = [
  // MIRA Tested
  check('authorId')
    .exists({
      checkNull: true,
      checkFalsy: true
    })
    .withMessage('Your story must specify the author.')
];

const storyValidations = [
  // MIRA Tested
  check('title')
    .exists({
      checkNull: true,
      checkFalsy: true
    })
    .withMessage('Your story must have a title')
    .isLength({ max: 255 })
    .withMessage('Your title may not be longer than 255 characters.'),
  // MIRA Tested
  check('body')
    .exists({
      checkNull: true,
      checkFalsy: true
    })
    .withMessage('Your story needs a body.')
];

// Story Routes
// MIRA Tested
router.post(
  '/',
  authorValidation,
  storyValidations,
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const {
      title,
      body,
      authorId
    } = req.body;
    const story = await Story.create({ title, body, authorId });
    res.status(201).json(story);
  })
);

// Get a Story by id
// MIRA Tested
router.get('/:id(\\d+)', asyncHandler(checkForStory),
  asyncHandler(async (req, res) => {
    res.json(req.story)
  }));

// Update a Story by id
// MIRA Tested
router.patch(
  '/:id(\\d+)',
  asyncHandler(checkForStory),
  storyValidations,
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const {
      title,
      body,
    } = req.body;
    const updatedStory = await req.story.update({ title, body });
    res.json(updatedStory);
  })
);

// Delete a Story and associated dependencies by Story id
// MIRA Tested
router.delete(
  '/:id(\\d+)',
  asyncHandler(checkForStory),
  asyncHandler(async (req, res) => {
    await deleteForStory(req.params.id, Comment)
    await deleteForStory(req.params.id, Like)
    await deleteForStory(req.params.id, Bookmark)

    await req.story.destroy();
    res.status(204).end();
  })
);





module.exports = router;
