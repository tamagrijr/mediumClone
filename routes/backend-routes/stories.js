const express = require('express');
const { check } = require('express-validator');
const { asyncHandler, handleValidationErrors } = require('../../utils');
const db = require('../../db/models');
const { Story, Comment, Like, User } = db;

const router = express.Router();

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
    .isLength({ max: 255 })
    .withMessage('Your title may not be longer than 255 characters.'),
  check('body')
    .exists({
      checkNull: true,
      checkFalsy: true
    })
    .withMessage('Your story needs a body.'),
  check('authorId')
    .exists({
      checkNull: true,
      checkFalsy: true
    })
    .withMessage('Your story must specify the author.')
]

// Story Routes
router.post(
  '/',
  storyValidations,
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const {
      title,
      body,
      authorId
    } = req.body;
    const story = await Story.create({ title, body, authorId });
    // console.log(story)
    await res.status(201).json({ story: {title: story.title, body: story.body, authorId: story.authorId} });
  })
);

router.get('/:id(\\d+)', asyncHandler(async (req, res, next) => {
  const storyId = parseInt(req.params.id);
  const story = await Story.findByPk(storyId);

  if (story) {
    res.json({ story });
  } else {
    next(storyNotFoundError(storyId));
  }
}));

router.patch(
  '/:id(\\d+)',
  storyValidations,
  handleValidationErrors,
  asyncHandler(async (req, res, next) => {
    const storyId = parseInt(req.params.id);
    const story = await Story.findByPk(storyId);

    const {
      title,
      body
    } = req.body;

    if (story) {
      const updatedStory = await story.update({ title, body });
      res.json({ updatedStory });
    } else {
      next(storyNotFoundError(storyId));
    }
  })
);

router.delete(
  '/:id(\\d+)',
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

// Story Comments
router.get(
  '/:id(\\d+)/comments',
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
        res.status(204).end();
      } else {
        next(storyNotFoundError(storyId));
      }
    }
  })
);

router.post(
  '/:storyId(\\d+)/comments',
  asyncHandler(async (req, res, next) => {
    const storyId = parseInt(req.params.storyId);
    const { body, userId } = req.body;

    const story = await Story.findByPk(storyId);

    if (story) {
      const comment = await Comment.create({ body, userId, storyId });
      res.json({ comment });
    } else {
      next(storyNotFoundError(storyId));
    }
  })
);


// Story Likes
router.post(
  '/:storyId(\\d+)/likes',
  asyncHandler(async (req, res, next) => {
    const storyId = parseInt(req.params.storyId);
    const { userId } = req.body;

    const like = await Like.findOne({
      where: {
        userId,
        storyId
      }
    });
    console.log(like)

    if (like) {
      res.status(304).end();
    } else {
      const createdLike = await Like.create({ storyId, userId });
      res.json({ createdLike });
    }
  })
);

router.delete(
  '/:storyId(\\d+)/likes/:id(\\d+)',
  asyncHandler(async (req, res) => {
    const likeId = parseInt(req.params.id)
    const like = await Like.findByPk(likeId);

    if (like) {
      await like.destroy();
      res.status(204).end();
    } else {
      res.status(304).end();
    }
  })
);

router.get(
  '/:storyId(\\d+)/likes',
  asyncHandler(async (req, res) => {
    const storyId = parseInt(req.params.storyId);

    const likes = await Like.findAll({
      where: {
        storyId
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

    res.json({ likeList });
  })
);

router.post(
  '/:storyId/comments',
  asyncHandler(async (req, res, next) => {
    const storyId = parseInt(req.params.storyId);
    const story = await Story.findByPk(storyId);
    const {
      body,
      userId
    } = req.body;

    if (story) {
      const comment = await Comment.create({ userId, storyId, body });
      res.json({ comment });
    } else {
      next(storyNotFoundError(storyId));
    }
  })
);

module.exports = router;
