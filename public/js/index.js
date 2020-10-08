import { loggedIn } from "./utils.js";

const logInScreen = document.querySelector('.loggedIn');
const logOutScreen = document.querySelector('.loggedOut');
const signInForm = document.querySelector('.signIn');
const signUpForm = document.querySelector('.signUp');

const demoLogin = document.querySelectorAll('.demo');
const logoutButton = document.querySelector('#logoutButton');
const signInButton = document.querySelector('#signInButton');
const signUpButton = document.querySelector('#signUpButton');
const profileButton = document.querySelector('#profileButton');
const signInLi = document.querySelector('.signInButton');
const signUpLi = document.querySelector('.signUpButton')

let logged = loggedIn();
if (logged) {
  logInScreen.classList.remove('hidden');
  signInLi.classList.add('hidden');
  signUpLi.classList.add('hidden');
} else {
  logOutScreen.classList.remove('hidden');
}

signInButton.addEventListener('click', e => {
  e.preventDefault();
  logInScreen.classList.add('hidden');
  logOutScreen.classList.add('hidden');
  signUpForm.classList.add('hidden');
  signInForm.classList.remove('hidden');
})
signUpButton.addEventListener('click', e => {
  e.preventDefault();
  logInScreen.classList.add('hidden');
  logOutScreen.classList.add('hidden');
  signInForm.classList.add('hidden');
  signUpForm.classList.remove('hidden');
})
logoutButton.addEventListener('click', (e) => {
  localStorage.removeItem('MEDIUM_ACCESS_TOKEN');
  localStorage.removeItem('MEDIUM_CURRENT_USER_ID');
  window.location.href = "/";
})
demoLogin.forEach(elem => {
  elem.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = 'demo@user.com'
    const password = '1234567890'
    const body = { email, password }
    try {
      // ADD THIS ONCE VALIDATION IS IMPLEMENTED
      const res = await fetch("/api/users/token", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw res;
      }
      const {
        token,
        user: { id },
      } = await res.json();
      // storage access_token in localStorage:
      localStorage.setItem("MEDIUM_ACCESS_TOKEN", token);
      localStorage.setItem("MEDIUM_CURRENT_USER_ID", id);
      // redirect to home page
      window.location.href = "/";
    } catch (err) {
      handleErrors(err);
    }
  })
})

// window.addEventListener('DOMContentLoaded', async () => {
//   if (window.location.href === 'http://localhost:3000/splash') {
//     const tagContainer = document.querySelector(".splash-tag-container");
//     const storiesJson = await fetch('http://localhost:3000/api/stories/');
//     const stories = await storiesJson.json();
//     stories.stories.forEach(story => {
//       const splashTag = document.createElement('a');
//       const tagImg = document.createElement('img');
//       const tagTxt = document.createElement('span');
//       splashTag.setAttribute('href', `/stories/${ story.id }`);
//       tagImg.setAttribute('src', 'favicon-32x32.png');
//       tagTxt.innerHTML = story.title;
//       splashTag.appendChild(tagImg);
//       splashTag.appendChild(tagTxt);
//       tagContainer.appendChild(splashTag);
//     });
//   }
// });





// const errBtn = document.querySelector(".errorButton");
// errBtn.addEventListener('click', (e) => {
//   e.preventDefault();
    // res.status(500);
    //         // // storage access_token in localStorage:
    //         // localStorage.setItem("MEDIUM_ACCESS_TOKEN", token);
    //         // localStorage.setItem("MEDIUM_CURRENT_USER_ID", id);
    //         // redirect to home page to see all tweets:

    // window.location.href = "/error-test";

// });
