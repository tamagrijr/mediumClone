// import {
//     handleErrors
// } from "./utils.js";

// import{ db } from '../../db/models';
// import { checkForUser } from "../../utils.js";
// import { is } from "sequelize/types/lib/operators";
// import { post } from "../../routes/frontEndRoutes.js";
// import { stories } from '../../routes/backend-routes/stories.js'
// const { Story, User } = db;
const createStoryForm = document.querySelector(".create-story-form");
// const createStoryButton = document.querySelector('.create-story-button');

const form = document.querySelector('.create-story-form')
form.addEventListener('submit', e => {
    e.preventDefault();
    alert('hello')
})

// createStoryButton.addEventListener('click', (e) => {
//     e.preventDefault();
//     alert('hi');
// })
//  async function attachStoryToUser(user) {
//      user.story = await Story.create({
//          title: data.title,
//          message: data.message
//      })

//      return user
//  }


createStoryForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(createStoryForm);
    const title = formData.get("title");
    const body = formData.get("body");

    const data = {
        title,
        body,
        authorId: localStorage.getItem("MEDIUM_CURRENT_USER_ID")
        // createdAt: new Date(),
        // updatedAt: new Date()
    };
    // await attachStoryToUser(data.authorId)
    console.log(data.title)
      

    // try {
    //     const isValid = checkForUser(story.userId);
    //     if (isValid) {
    //         await Story.create({
    //             title: story.title,
    //             body: story.body
    //         })
    //         const user
    //     }
    // } catch (error) {
    //     console.error(error)
    // }
})
