const express = require('express');
const csrf = require('csurf');
const { asyncHandler } = require('../utils')
const fetch = require('node-fetch')
const { getAllStoryInfo } = require('./fetch');

const frontEndRouter = express.Router();
const csrfProtection = csrf({ cookie: true });

// const url = "http://localhost:3000"


// Provide a 'createdAt' value and receive a string in form 'Jan 01 2020'
function getDate(createdAt) {
  let parsedDate = new Date(createdAt)
  return parsedDate.toDateString().slice(4)
}

// Provide a list of objects with the 'createdAt' property to update their
// values to strings in form 'Jan 01 2020'.
function getDates(content) {
  return content.map(item => {
    item.createdAt = getDate(item.createdAt)
    return item
  })
}

// Fetch a User by id, without password info.
async function getUser(id) {
  let user = await fetch(`/api/users/${id}`)
  user = await user.json()
  user.createdAt = getDate(user.createdAt)
  return user
}

// Fetch array of Stories by Author's id and convert 'createdAt' to be readable.
// Includes:
//  .Author.firstName,  .Author.lastName
//  .Comments (array, ids only)
//  .Likes (array, ids only)
async function getStoriesByUser(id) {
  let stories = await fetch(`/api/users/${id}/stories`)
  stories = await stories.json()
  stories = getDates(stories)
  return stories
}

// Fetch array of Stories Liked by User (id).= and convert 'createdAt' to be readable.
// Includes:
// .Story.id, .Story.title, .Story.createdAt, .Story.authorId
// .Story.Likes (ids only)
// .Story.Comments (ids only)
// .Story.Author.firstName, .Story.Author.lastName
async function getLikesByUser(id) {
  let likes = await fetch(`/api/users/${id}/likes`)
  likes = await likes.json()
  console.log("likes?!", likes)
  likes = getDates(likes)
  likes = likes.map(like => {
    like.Story.createdAt = getDate(like.Story.createdAt)
    return like
  })
  return likes
}

// Fetch array of Comments by User (id) with associated Stories
async function getCommentsByUser(id) {
  let comments = await fetch(`/api/users/${id}/comments`)
  comments = await comments.json()
  comments = getDates(comments)
  return comments
}

async function getFollowedUsers(id) {
  let followedUsers = await fetch(`/api/users/${id}/follows`)
  followedUsers = await followedUsers.json()
  return followedUsers
}

async function getFollowingUsers(id) {
  let followingUsers = await fetch(`/api/users/${id}/followers`)
  followingUsers = await followingUsers.json()
  return followingUsers
}

async function getBookmarkedStoriesForUser(id) {
  let bookmarks = await fetch(`/api/users/${id}/bookmarks`)
  bookmarks = await bookmarks.json()
  bookmarks = bookmarks.map(bookmark => {
    bookmark.Story.createdAt = getDate(bookmark.Story.createdAt)
    return bookmark
  })
  return bookmarks
}

async function getStory(id) {
  let story = await fetch(`/api/stories/${id}`)
  return await story.json()
}

async function getAllStories() {
  let stories = await fetch(`/api/stories`)
  return await stories.json()
}

async function getStoriesByFollowedAuthors(userId) {
  let stories = await fetch(`/api/users/${userId}/follows/stories`)
  return await stories()
}

async function getCommentsForStory(id) {
  let comments = await fetch(`/api/stories/${id}/comments`)
  return await comments.json()
}


// display story by id
frontEndRouter.get("/stories/:id(\\d+)", async (req, res) => {
    const storyInfo = await getAllStoryInfo(req);
    console.log(storyInfo);
    res.render('story-layout', { storyInfo, title: storyInfo.title });
});

//actual splash page
frontEndRouter.get("/splash", (req, res) => {
  res.render('splash', { title: "MEDAYUM"});
});
//splash page
frontEndRouter.get("/", asyncHandler( async(req, res) => {
  try {
    let stories = await fetch(`/api/stories`);
    stories = await stories.json();

    res.render('index', { stories });
  } catch (error) {
    res.render('index')
  }
}));
//sign up form
frontEndRouter.get("/sign-up", csrfProtection, (req, res) => {
  res.render('sign-up', { csrfToken: req.csrfToken() });
});
//log-in form
frontEndRouter.get("/log-in", csrfProtection, (req, res) => {
  res.render('log-in', { csrfToken: req.csrfToken() });
});
//user profile
frontEndRouter.get("/users/:id", csrfProtection, asyncHandler(async (req, res) => {
  const id = req.params.id
  const user = await getUser(id)
  const userStories = await getStoriesByUser(id)
  const userComments = await getCommentsByUser(id)
  const userLikes = await getLikesByUser(id)
  const followedUsers = await getFollowedUsers(id)
  const followingUsers = await getFollowingUsers(id)
  const bookmarkedStories = await getBookmarkedStoriesForUser(id)
  res.render('profile', {
    csrfToken: req.csrfToken(),
    user,
    userStories,
    userComments,
    userLikes,
    followedUsers,
    followingUsers,
    bookmarkedStories,
  });
}))

  // TODO Convert createdAt to Month Year format.

//edit user profile form
// frontEndRouter.get("/users/:id/edit", csrfProtection, (req, res) => {
//   res.render('edit-profile', { csrfToken: req.csrfToken() });
// });
//create new story form
frontEndRouter.get("/create", csrfProtection, (req, res) => {
  res.render('create', { csrfToken: req.csrfToken() });
});
//display story edit form
frontEndRouter.get("/stories/:id/edit", csrfProtection, (req, res) => {
  res.render('story-edit-layout', { csrfToken: req.csrfToken() });
});
//sign up form
frontEndRouter.get("/sign-up", csrfProtection, (req, res) => {
    res.render('sign-up', { csrfToken: req.csrfToken(), title: "Sign Up" });
});
//log-in form
frontEndRouter.get("/log-in", csrfProtection, (req, res) => {
    res.render('log-in', { csrfToken: req.csrfToken(), title: "Log In" });
});
//user profile
frontEndRouter.get("/users", (req, res) => {
    res.render('profile', { title: "Profile" });
});
//edit user profile form
frontEndRouter.get("/users/:id(\\d+)/edit", csrfProtection, (req, res) => {
    res.render('edit-profile', { csrfToken: req.csrfToken(), title: "Edit Profile" });
});
//create new story form
frontEndRouter.get("/create", csrfProtection, (req, res) => {
    res.render('create', { csrfToken: req.csrfToken(), title: "Create a Story" });
});
//display story edit form
frontEndRouter.get("/stories/:id(\\d+)/edit", csrfProtection, (req, res) => {
    res.render('story-edit-layout', { csrfToken: req.csrfToken(), title: "Edit Story" });
});
//display feed
frontEndRouter.get("/feed", asyncHandler( async(req, res) => {

    res.render('feed', { title: "My Feed", stories });
}));
//throw error
frontEndRouter.get("/error-test", (req, res, next) => {
  const err = new Error("500 Internal Server Error.");
  err.status = 500;
  err.title = "custom 500 error";
  next(err);
})

module.exports = frontEndRouter;
