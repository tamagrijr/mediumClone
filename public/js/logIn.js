import { handleErrors } from "./utils.js";

const submitLogIn = document.querySelector(".log-in");
const logInForm = document.querySelector(".log-in-form")
submitLogIn.addEventListener("submit", async (e) => {
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
