const express = require('express');
const { asyncHandler } = require('../../utils');
const db = require('../../db/models');
const { Story, Comment, Like } = db;

const router = express();

router.get('/api/stories/:id', asyncHandler(async (req, res) => {
  const story = await Story.findByPk(req.params.id);
  res.json({ story });
}));

module.exports = router;
