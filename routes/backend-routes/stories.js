const express = require('express');
const { check } = require('express-validator');
const { asyncHandler, handleValidationErrors } = require('../../utils');
const db = require('../../db/models');
const { Story, Comment, Like, User, Bookmark } = db;

const router = express.Router();

// MIRA Tested
const storyNotFoundError = id => {
  const err = new Error(`Story id ${ id } could not be found!`);
  err.title = "Story not found";
  err.status = 404;
  return err;
};

const storyValidations = [
  // MIRA Tested
  check('authorId')
    .exists({
      checkNull: true,
      checkFalsy: true
    })
    .withMessage('Your story must specify the author.')
];

const storyUpdateValidations = [
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

// get a list of all stories, just for now for the splash page
// at least until topics
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const stories = await Story.findAll();
    res.json({ stories });
  })
);

// Story Routes
// MIRA Tested
router.post(
  '/',
  storyValidations,
  storyUpdateValidations,
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const {
      title,
      body,
      authorId
    } = req.body;
    const story = await Story.create({ title, body, authorId });
    await res.status(201).json({ story });
  })
);

// MIRA Tested
router.get('/:id(\\d+)', asyncHandler(async (req, res, next) => {
  const storyId = parseInt(req.params.id);
  const story = await Story.findByPk(storyId);

  if (story) {
    res.json({ story });
  } else {
    next(storyNotFoundError(storyId));
  }
}));

// MIRA Tested
router.patch(
  '/:id(\\d+)',
  storyUpdateValidations,
  handleValidationErrors,
  asyncHandler(async (req, res, next) => {
    const storyId = parseInt(req.params.id);
    const story = await Story.findByPk(storyId);

    const {
      title,
      body,
    } = req.body;

    if (story) {
      const updatedStory = await story.update({ title, body });
      res.json({ updatedStory });
    } else {
      next(storyNotFoundError(storyId));
    }
  })
);

// MIRA Tested
router.delete(
  '/:id(\\d+)',
  asyncHandler(async (req, res, next) => {
    const storyId = parseInt(req.params.id);
    const story = await Story.findByPk(storyId);

    if (story) {
      const comments = await Comment.findAll({
        where: {
          storyId
        }
      });
      comments.forEach(async (comment) => {
        await comment.destroy();
        return;
      });

      const likes = await Like.findAll({
        where: {
          storyId
        }
      });
      likes.forEach(async (like) => {
        await like.destroy();
        return;
      });

      const bookmarks = await Bookmark.findAll({
        where: {
          storyId
        }
      });
      bookmarks.forEach(async (bookmark) => {
        await bookmark.destroy();
        return;
      });

      await story.destroy();
      res.status(204).end();
    } else {
      next(storyNotFoundError(storyId));
    }
  })
);

// Story Comments
// MIRA Tested
router.get(
  '/:id(\\d+)/comments',
  asyncHandler(async (req, res, next) => {
    const storyId = parseInt(req.params.id);
    const comments = await Comment.findAll({
      where: {
        storyId
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

// MIRA Tested
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
      // TODO MIRA Trying to grab a 'story' with a :storyId integer that doesn't
      // exist does not trigger this path. Ex: /api/stories/1234/comments
      next(storyNotFoundError(storyId));
    }
  })
);


// Story Likes
// MIRA Tested
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

    if (like) {
      res.status(304).end();
    } else {
      const createdLike = await Like.create({ storyId, userId });
      res.json({ createdLike });
    }
  })
);

// MIRA Tested
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
