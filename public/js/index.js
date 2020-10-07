window.addEventListener('DOMContentLoaded', async () => {
  if (window.location.href === 'http://localhost:3000/splash') {
    const tagContainer = document.querySelector(".splash-tag-container");
    const storiesJson = await fetch('http://localhost:3000/api/stories/');
    const stories = await storiesJson.json();
    stories.stories.forEach(story => {
      const splashTag = document.createElement('a');
      const tagImg = document.createElement('img');
      const tagTxt = document.createElement('span');
      splashTag.setAttribute('href', `/stories/${ story.id }`);
      tagImg.setAttribute('src', 'favicon-32x32.png');
      tagTxt.innerHTML = story.title;
      splashTag.appendChild(tagImg);
      splashTag.appendChild(tagTxt);
      tagContainer.appendChild(splashTag);
    });
  }
});

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
