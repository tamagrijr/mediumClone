import { handleErrors } from "./utils.js";

const signUpForm = document.querySelector(".sign-up-form");

signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(signUpForm);
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const password = formData.get("password");
  // csrf James make csrf in body
  const body = { firstName, lastName, email, password };
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
      throw res;
    } else {
      const jsonRes = await res.json();
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
