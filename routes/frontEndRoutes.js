const express = require('express');
const csrf = require('csurf');
const fetch = require('./fetch')
// import { getAllStoryInfo } from "./fetch";

const frontEndRouter = express.Router();

const csrfProtection = csrf({cookie: true});

//actual splash page
frontEndRouter.get("/splash", (req, res) => {
  res.render('splash', { title: "MEDAYUM"});
});
//splash page
frontEndRouter.get("/", (req, res) => {
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
