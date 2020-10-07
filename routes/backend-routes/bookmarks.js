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
// MIRA Tested
bookmarksRouter.get("/users/:id/bookmarks",
  asyncHandler(checkForUser),
  asyncHandler(async (req, res) => {
    const userBookmarks = await Bookmark.findAll({
      where: { userId: req.params.id }
    })
    checkForContent(res, userBookmarks)
  }))

// Get a list of Bookmarks for a Story
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