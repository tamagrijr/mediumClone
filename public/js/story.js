import {
    handleErrors
} from "./utils.js";

import{ db } from '../../db/models';
const { Story, User } = db;
const createStoryForm = document.querySelector("create-story-form");
const createStoryButton = document.querySelector('create-story-button');

createStoryForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(createStoryForm);
    const title = formData.get("Title");
    const message = formData.get("Message");
    const story = {
        title,
        message
    };
    
    // console.log(formData);
    // console.log(title);
    // console.log(message);
    // console.log(story);
    // console.log(story.title);
    // console.log(story.message);
    
})
