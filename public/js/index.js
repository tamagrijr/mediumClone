import { loggedIn } from "./utils.js";
import { handleErrors } from "./utils.js";

const logInScreen = document.querySelector('.loggedIn');
const logOutScreen = document.querySelector('.loggedOut');
const signInButton = document.querySelector('#signInButton');
const signUpButton = document.querySelectorAll('.signUpBanner');
const signInDisplay = document.querySelector('.signIn');
const signUpDisplay = document.querySelector('.signUp');
const swapToLogIn = document.querySelector('.swapToLogIn');
const swapToSignUp = document.querySelector('.swapToSignUp');
const errorsContainer = document.querySelectorAll(".errors-container");
const demoLoginDiv = document.querySelector('.demoLogIn');

const logInForm = document.querySelector(".logInForm")
const signUpForm = document.querySelector(".signUpForm");

const demoLogin = document.querySelectorAll('.demo');

let logged = loggedIn();
if (logged) {
  logInScreen.classList.remove('hidden');
} else {
  demoLoginDiv.classList.remove('hidden');
  logOutScreen.classList.remove('hidden');
}
signInButton.addEventListener('click', e => {
  e.preventDefault();
  logInScreen.classList.add('hidden');
  logOutScreen.classList.add('hidden');
  signUpDisplay.classList.add('hidden');
  signInDisplay.classList.remove('hidden');
  errorsContainer.forEach(e => {
    e.innerHTML = '';
  })
})
signUpButton.forEach( e => {
  e.addEventListener('click' , e => {
    e.preventDefault();
    logInScreen.classList.add('hidden');
    logOutScreen.classList.add('hidden');
    signInDisplay.classList.add('hidden');
    signUpDisplay.classList.remove('hidden');
    errorsContainer.forEach(e => {
    e.innerHTML = '';
    })
  })
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

logInForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(logInForm);
  const email = formData.get("email");
  email.toLowerCase();
  const password = formData.get("password");
  const body = {email, password};

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
      // redirect to home page:
      window.location.href = "/";
    } catch (err) {
      handleErrors(err);
    }
})
signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(signUpForm);
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get('confirmPassword')
  const body = { firstName, lastName, email, password, confirmPassword };
  try {
    //  ADD THIS ONCE AUTHORIZATION IS IMPLEMENTED
    const res = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("res is", res)
    if (!res.ok) {
      console.log("okay is...", res.ok, res.status)
      throw res;
    } else {
      const jsonRes = await res.json();
      console.log("jsonRes is ", jsonRes)
      const { token, newUser: { id } } = jsonRes
      // storage access_token in localStorage:
      localStorage.setItem("MEDIUM_ACCESS_TOKEN", token);
      localStorage.setItem("MEDIUM_CURRENT_USER_ID", id);
      // redirect to home page
      window.location.href = "/";
    }
  } catch (err) {
    console.log("caught the error", err.ok, err)
    handleErrors(err);
  }
});
swapToLogIn.addEventListener('click', e => {
  e.preventDefault();
  signUpDisplay.classList.add('hidden');
  signInDisplay.classList.remove('hidden');
  errorsContainer.forEach(e => {
    e.innerHTML = '';
  })
})
swapToSignUp.addEventListener('click', e => {
  signInDisplay.classList.add('hidden');
  signUpDisplay.classList.remove('hidden');
  errorsContainer.forEach(e => {
    e.innerHTML = '';
  })
})
