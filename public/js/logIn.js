import { handleErrors } from "./utils.js";

const logInForm = document.querySelector(".log-in-form");
const demoLogin = document.querySelector('#demo');

logInForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(logInForm);
    const email = formData.get("email");
    email.toLocaleLowerCase();
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

demoLogin.addEventListener('click', async(e) => {
  e.preventDefault();
  const email = 'demo@user.com'
  const password = '1234567890'
  const body ={email, password}
  try {
    // ADD THIS ONCE VALIDATION IS IMPLEMENTED
    const res = await fetch("http://localhost:3000/api/users/token", {
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
