import { handleErrors } from "./utils.js";

const userId = window.localStorage.getItem('MEDIUM_CURRENT_USER_ID')
// import{ db } from '../../db/models';
// import { checkForUser } from "../../utils.js";
// import { is } from "sequelize/types/lib/operators";
// import { post } from "../../routes/frontEndRoutes.js";
// import { stories } from '../../routes/backend-routes/stories.js'
// const { Story, User } = db;

const createStoryForm = document.querySelector(".create-story-form");
// const createStoryButton = document.querySelector('.create-story-button');

const form = document.querySelector('.create-story-form')
form.addEventListener('submit', async e => {
    e.preventDefault();
    const formData = new FormData(form);
    const title = formData.get("title");
    const body = formData.get("body");
    const obj = {title, body, userId};
    try {
        // ADD THIS ONCE VALIDATION IS IMPLEMENTED
        const res = await fetch("/api/stories", {
          method: "POST",
          body: JSON.stringify(obj),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          throw res;
        }
        // const {
        //   token,
        //   user: { id },
        // } = await res.json();
        // storage access_token in localStorage:
        // localStorage.setItem("MEDIUM_ACCESS_TOKEN", token);
        // localStorage.setItem("MEDIUM_CURRENT_USER_ID", id);
        // redirect to home page:
        window.location.href = "/";
      } catch (err) {
        console.log(err)
      }
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
