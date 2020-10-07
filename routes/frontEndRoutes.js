const express = require('express');
const frontEndRouter = express.Router();
//actual splash page
frontEndRouter.get("/splash", (req, res) => {
  res.render('splash');
});
//splash page
frontEndRouter.get("/", (req, res) => {
    res.render('index');
});
//sign up form
frontEndRouter.get("/sign-up", (req, res) => {
    res.render('sign-up');
});
//log-in form
frontEndRouter.get("/log-in", (req, res) => {
    res.render('log-in');
});
//user profile
frontEndRouter.get("/users/:id", (req, res) => {
    res.render('profile');
});
//edit user profile form
frontEndRouter.get("/users/:id/edit", (req, res) => {
    res.render('edit-profile');
});
//create new story form
frontEndRouter.get("/create", (req, res) => {
    res.render('create');
});
// display story by id
frontEndRouter.get("/stories/:id", (req, res) => {
    res.render('story-layout');
});
//display story edit form
frontEndRouter.get("/stories/:id/edit", (req, res) => {
    res.render('story-edit-layout');
});
//display feed
frontEndRouter.get("/feed", (req, res) => {
    res.render('feed');
});
//throw error
frontEndRouter.get("/error-test", (req, res, next) => {
    const err = new Error("500 Internal Server Error.");
    err.status = 500;
    err.title = "custom 500 error";
    next(err);
})

module.exports = frontEndRouter;
