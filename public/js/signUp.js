import { handleErrors } from "./utils.js";

const signUpForm = document.querySelector(".sign-up-form");

signUpForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(signUpForm);
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const body = { firstName, lastName, username, email, password};
    try {
    //    ADD THIS ONCE AUTHORIZATION IS IMPLEMENTED
    //   const res = await fetch("/api/users", {
    //     method: "POST",
    //     body: JSON.stringify(body),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   if (!res.ok) {
    //     throw res;
    //   }
    //   const {
    //     token,
    //     user: { id },
    //   } = await res.json();
    //   // storage access_token in localStorage:
    //   localStorage.setItem("TWITTER_LITE_ACCESS_TOKEN", token);
    //   localStorage.setItem("TWITTER_LITE_CURRENT_USER_ID", id);
    //   // redirect to home page to see all tweets:
      window.location.href = "/";
    } catch (err) {
      handleErrors(err);
    }
  });
