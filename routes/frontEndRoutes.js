const express = require('express');
const csrf = require('csurf');
// const fetch = require('./fetch')
const fetch = require('node-fetch')
// import { getAllStoryInfo } from "./fetch";

const frontEndRouter = express.Router();
const csrfProtection = csrf({ cookie: true });

const url = "http://localhost:3000"

function getDate(createdAt) {
  let parsedDate = new Date(createdAt)
  return parsedDate.toDateString().slice(4)
}

function getDates(content) {
  return content.map(item => {
    item.createdAt = getDate(item.createdAt)
    return item
  })
}

async function getUser(id) {
  let user = await fetch(`${url}/api/users/${id}`)
  user = await user.json()
  user.createdAt = getDate(user.createdAt)
  return { firstName, lastName, email, createdAt } = user
  // Returns non-sensitive information, no hashedPassword
}

async function getStory(id) {
  let story = await fetch(`${url}/api/stories/${id}`)
  return await story.json()
}

async function getStoriesByUser(id) {
  let stories = await fetch(`${url}/api/users/${id}/stories`)
  stories = await stories.json()
  stories = getDates(stories)
  return stories
}

async function getLikesByUser(id) {
  let likes = await fetch(`${url}/api/users/${id}/likes`)
  likes = await likes.json()
  // likes = getDates(likes)
  // likes = likes.map(like => {
  //   like.Story.createdAt = getDate(like.Story.createdAt)
  //   return like
  // })
  return likes
}

async function getCommentsByUser(id) {
  let comments = await fetch(`${url}/api/users/${id}/comments`)
  comments = await comments.json()
  comments = getDates(comments)
  return comments


  async function getAllStories() {
    let stories = await fetch(`${url}/api/stories`)
    return await stories.json()
  }
  async function getStoriesByFollowedAuthors(userId) {
    let stories = await fetch(`${url}/api/users/${userId}/follows/stories`)
    return await stories()
  }

  async function getFollowerIdsOfUser(id) {
    let followers = await fetch(`${url}/api/users/${id}/followers`)
    followers = await followers.json()
    return followers.map(follower => follower.followerId)
  }
  async function getFollowIdsOfUser(id) {
    let follows = await fetch(`${url}/api/users/${id}/follows`)
    follows = await follows.json()
    return follows.map(follow => follow.followingId)
  }

  async function getBookmarkedStoryIdsForUser(id) {
    let bookmarks = await fetch(`${url}/api/users/${id}/bookmarks`)
    bookmarks = await bookmarks.json()
    return bookmarks.map(bookmark => bookmark.storyId)
  }
  async function getUserIdsWithBookmarkForStory(id) {
    let bookmarks = await fetch(`${url}/api/stories/${id}/bookmarks`)
    bookmarks = await bookmarks.json()
    return bookmarks.map(bookmark => bookmark.storyId)
  }

  async function getUserIdsOfLikesForStory(id) {
    let likes = await fetch(`${url}/api/stories/${id}/likes`)
    likes = await likes.json()
    return likes.map(like => like.userId)
  }
  async function getStoryIdsOfLikesForStory(id) {
    let likes = await fetch(`${url}/api/users/${id}/likes`)
    likes = await likes.json()
    return likes.map(like => like.storyId)
  }


}
async function getCommentsForStory(id) {
  let comments = await fetch(`${url}/api/stories/${id}/comments`)
  return await comments.json()
}

// *************************************

//actual splash page
frontEndRouter.get("/splash", (req, res) => {
  res.render('splash', { title: "MEDAYUM" });
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

// *************************************

//user profile
frontEndRouter.get("/users/:id", async (req, res) => {
  const id = req.params.id

  const user = await getUser(id)
  const userStories = await getStoriesByUser(id)
  const userComments = await getCommentsByUser(id)
  const userLikes = await getLikesByUser(id)
  console.log("hello like 0", userLikes[0])
  res.render('profile', {
    user, userStories, userComments, userLikes
  });
});

// alt="#{user.firstName} #{user.lastName}"
// alt=`Author ${ user.firstName } ${ user.firstName }`

// `/assets/av/3434132.png

// async function renderPage(path, template, fetchedContent) {
//   frontEndRouter.get(path, csrfProtection, ((req, res) => {
//     fetchedContent.csrfToken = req.csrfToken()
//     res.render(template, fetchedContent)
//   }))
// }


// renderPage(`/users/:id/likes`, 'profile-likes', { user } )
// renderPage(`/users/:id/comments`, 'profile-comments', )
// renderPage(`/users/:id/follows`, 'profile-follows', )
// renderPage(`/users/:id/followers`, 'profile-followers', )


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
