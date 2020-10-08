const express = require('express');
const csrf = require('csurf');
const fetch = require('./fetch')
// import { getAllStoryInfo } from "./fetch";

const frontEndRouter = express.Router();
const csrfProtection = csrf({ cookie: true });

const tokenHeader = { headers: { "Authorization": `Bearer: ${token}` } }


async function getUserById(id) {
  const user = await fetch(`/api/users/${id}`)
  return { firstName, lastName, email, createdAt } = user
  // Test if this lazy return works. If not, just be not-lazy.
  // Returns non-sensitive information, no hashedPassword
}

async function getStoryById(id) {
  let story = await fetch(`/api/stories/${id}`)
  return await story.json()
}

async function getStoriesByUserId(id) {
  let stories = await fetch(`/api/users/${id}/stories`)
  return await stories.json()
}
async function getAllStories() {
  let stories = await fetch(`/api/stories`)
  return await stories.json()
}
async function getStoriesByFollowedAuthors(userId) {
  let stories = await fetch(`/users/${userId}/follows/stories`)
  return await stories()
}

async function getFollowerIdsOfUser(id) {
  let followers = await fetch(`/api/users/${id}/followers`)
  followers = await followers.json()
  return followers.map(follower => follower.followerId)
}
async function getFollowIdsOfUser(id) {
  let follows = await fetch(`/api/users/${id}/follows`)
  follows = await follows.json()
  return follows.map(follow => follow.followingId)
}

async function getBookmarkedStoryIdsForUser(id) {
  let bookmarks = await fetch(`/api/users/${id}/bookmarks`)
  bookmarks = await bookmarks.json()
  return bookmarks.map(bookmark => bookmark.storyId)
}
async function getUserIdsWithBookmarkForStory(id) {
  let bookmarks = await fetch(`/api/stories/${id}/bookmarks`)
  bookmarks = await bookmarks.json()
  return bookmarks.map(bookmark => bookmark.storyId)
}

async function getUserIdsOfLikesForStory(id) {
  let likes = await fetch(`/api/stories/${id}/likes`)
  likes = await likes.json()
  return likes.map(like => like.userId)
}
async function getStoryIdsOfLikesForStory(id) {
  let likes = await fetch(`/api/users/${id}/likes`)
  likes = await likes.json()
  return likes.map(like => like.storyId)
}

async function getCommentsForUser(id) {
  let comments = await fetch(`/api/users/${id}/comments`)
  return await comments.json()
}
async function getCommentsForStory(id) {
  let comments = await fetch(`/api/stories/${id}/comments`)
  return await comments.json()
}



//actual splash page
frontEndRouter.get("/splash", (req, res) => {
  res.render('splash', { title: "MEDAYUM"});
});
//splash page
frontEndRouter.get("/", (req, res) => {
  res.render('index');
});
//sign up form
frontEndRouter.get("/sign-up", csrfProtection, (req, res) => {
  res.render('sign-up', { csrfToken: req.csrfToken() });
});
//log-in form
frontEndRouter.get("/log-in", csrfProtection, (req, res) => {
  res.render('log-in', { csrfToken: req.csrfToken() });
});
//user profile
frontEndRouter.get("/users/:id", async (req, res) => {
  const userId = req.params.id


  // image names= av-userId.(jpg or png etc.)
  // story-storyId-01-99
  // 
  
  // TODO Convert createdAt to Month Year format.

  res.render('profile', {
    user, userStories, userComments,
    userFollows, userFollowers,
    bookmarkedStories,
    likedStories,
  });
});
//edit user profile form
frontEndRouter.get("/users/:id/edit", csrfProtection, (req, res) => {
  res.render('edit-profile', { csrfToken: req.csrfToken() });
});
//create new story form
frontEndRouter.get("/create", csrfProtection, (req, res) => {
  res.render('create', { csrfToken: req.csrfToken() });
});
// display story by id
frontEndRouter.get("/stories/:id", (req, res) => {
  res.render('story-layout');
});
//display story edit form
frontEndRouter.get("/stories/:id/edit", csrfProtection, (req, res) => {
  res.render('story-edit-layout', { csrfToken: req.csrfToken() });
});
//display feed
frontEndRouter.get("/feed", (req, res) => {
  res.render('feed');
    res.render('index', { title: "MEDAYUM" });
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
// display story by id
frontEndRouter.get("/stories/:id(\\d+)", async (req, res) => {
    let storyInfo = await fetch.getAllStoryInfo(req);
    console.log(storyInfo);
    res.render('story-layout', { storyInfo, title: storyInfo.title });
});
//display story edit form
frontEndRouter.get("/stories/:id(\\d+)/edit", csrfProtection, (req, res) => {
    res.render('story-edit-layout', { csrfToken: req.csrfToken(), title: "Edit Story" });
});
//display feed
frontEndRouter.get("/feed", (req, res) => {
    res.render('feed', { title: "My Feed" });
});
//throw error
frontEndRouter.get("/error-test", (req, res, next) => {
  const err = new Error("500 Internal Server Error.");
  err.status = 500;
  err.title = "custom 500 error";
  next(err);
})

module.exports = frontEndRouter;
