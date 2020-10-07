// const errBtn = document.querySelector(".errorButton");
const splashTagContainer = document.querySelector(".splash-tag-container");

window.addEventListener('DOMContentLoaded', async () => {
  const storiesJson = await fetch('http://localhost:3000/api/stories/');
  const stories = await storiesJson.json();
  stories.stories.forEach(story => {
    const splashTag = document.createElement('a');
    const tagImg = document.createElement('img');
    const tagTxt = document.createElement('span');
    tagImg.setAttribute('src', 'favicon-32x32.png');
    tagTxt.innerHTML = story.title;
    splashTag.appendChild(tagImg);
    splashTag.appendChild(tagTxt);
    splashTagContainer.appendChild(splashTag);
  });
});

// errBtn.addEventListener('click', (e) => {
//   e.preventDefault();
    // res.status(500);
    //         // // storage access_token in localStorage:
    //         // localStorage.setItem("MEDIUM_ACCESS_TOKEN", token);
    //         // localStorage.setItem("MEDIUM_CURRENT_USER_ID", id);
    //         // redirect to home page to see all tweets:

    // window.location.href = "/error-test";

// });
