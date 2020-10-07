const express = require("express")
const {
  asyncHandler,
  checkForUser,
  checkForStory,
  storyNotFound,
  checkForContent
} = require("../../utils")
const { Bookmark, Story } = require("../../db/models")
const bookmarksRouter = express.Router()


// Get list of Bookmarked Stories for a User
// MIRA Tested: Existing user and bookmarks
// Non-existing user: 404 User Not Found
// Existing user, no bookmarks: 204
// Non-digit user id: 500 Server Error, invalid input syntax
bookmarksRouter.get("/users/:id/bookmarks",
  asyncHandler(checkForUser),
  asyncHandler(async (req, res) => {
    const userBookmarks = await Bookmark.findAll({
      where: { userId: req.params.id }
    })
    checkForContent(res, userBookmarks)
  }))

// Get a list of Bookmarks for a Story
// MIRA Tested: Existing story and bookmarks
// Existing story, no bookmarks: 204
// Non-existing user: 404 Story Not Found
// Non-digit Story id: 500 Server Error, invalid input syntax
bookmarksRouter.get("/stories/:id/bookmarks",
  asyncHandler(checkForStory),
  asyncHandler(async (req, res) => {
    const storyBookmarks = await Bookmark.findAll({
      where: { storyId: req.params.id }
    })
    checkForContent(res, storyBookmarks)
  })
)

// Create a Bookmark to a Story for a User
// MIRA Tested
bookmarksRouter.post("/users/:id/bookmarks",
  asyncHandler(checkForUser),
  asyncHandler(async (req, res) => {
    const newBookmark = { userId: req.params.id, storyId: req.body.storyId }
    const bookmarkExists = await Bookmark.findOne({ where: newBookmark })
    const story = await Story.findByPk(req.body.storyId)
    
    if (bookmarkExists) res.status(304).end()
    else if (!story) storyNotFound(req.body.storyId)
    else {
      const bookmark = await Bookmark.create(newBookmark)
      res.json(bookmark)
    }
  }))

// Delete a Bookmark to a Story for a User by id
// MIRA Tested
bookmarksRouter.delete("/users/:id/bookmarks",
  asyncHandler(async (req, res) => {
    const bookmark = await Bookmark.findOne({
      where: { userId: req.params.id, storyId: req.body.storyId }
    })
    if (bookmark) {
      await bookmark.destroy()
      res.status(204).end()
    } else {
      res.status(304).end()
    }
  })
)

module.exports = bookmarksRouter