const errBtn = document.querySelector(".errorButton");

errBtn.addEventListener('click', (e) => {
    e.preventDefault();

    // res.status(500);


    //         // // storage access_token in localStorage:
    //         // localStorage.setItem("MEDIUM_ACCESS_TOKEN", token);
    //         // localStorage.setItem("MEDIUM_CURRENT_USER_ID", id);
    //         // redirect to home page to see all tweets:

    window.location.href = "/error-test";

})