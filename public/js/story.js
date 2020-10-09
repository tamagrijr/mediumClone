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


// createStoryForm.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     alert('wtffffff');
//     const formData = new FormData(createStoryForm);
//     const title = formData.get("Title");
//     const message = formData.get("Message");
//     const data = {
//         title,
//         message
//     };
    // attachStoryToUser(req.params.userId)

//    console.log(data);








    //   console.log(formData);
    //   console.log(title);
    //   console.log(message);
    //   console.log(story);
    //   console.log(story.title);
    //   console.log(story.message);

    // try {
    //     const isValid = checkForUser(story.userId);
    //     if (isValid) {
            // await Story.create({
            //     title: story.title,
            //     message: story.message
            // })
            // const user
    //     }
    // } catch (error) {
    //     console.error(error)
    // }
