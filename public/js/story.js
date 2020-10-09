import {
    handleErrors, checkForUser
} from "./utils.js";

import{ db } from '../../db/models';
import { checkForUser } from "../../utils.js";
import { is } from "sequelize/types/lib/operators";
import { post } from "../../routes/frontEndRoutes.js";
import { stories } from '../../routes/backend-routes/stories.js'
const { Story, User } = db;
const createStoryForm = document.querySelector(".create-story-form");
const createStoryButton = document.querySelector('.create-story-button');

createStoryButton.addEventListener('click', (e) => {
    // e.preventDefault();
    alert('hi');
})
//  async function attachStoryToUser(user) {
//      user.story = await Story.create({
//          title: data.title,
//          message: data.message
//      })

//      return user
//  }


createStoryForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("MEDIUM_CURRENT_USER_ID");
    const formData = new FormData(createStoryForm);
    const title = formData.get("title");
    const message = formData.get("body");
    const data = {
        title,
        message,
        authorId: userId
    };
    
    try {
        const isValid = checkForUser(data.authorId);
        if (isValid) {
            await Story.create({
                title: data.title,
                body: data.body,
                authorId: data.authorId
            })
            window.location.href = '/';
        }
    } catch (error) {
        console.error(error)
    }


    
    
    
    
    
    
    
    //   console.log(formData);
    //   console.log(title);
    //   console.log(message);
    //   console.log(story);
    //   console.log(story.title);
    //   console.log(story.message);

    // 
    
    });
