const express = require('express');
const { asyncHandler } = require('../../utils');
const db = require('../../db/models');
const { Story } = db;

const router = express();

router.get('/api/stories/:id', asyncHandler(async (req, res) => {
  const stories = Story.findByPk(req.params.id);
  
}));

module.exports = router;
