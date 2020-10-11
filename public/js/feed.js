// const { render } = require("pug");

window.addEventListener('DOMContentLoaded', async () => {

  const feedContainer = document.querySelector('.feedContainer');
  const storyContainer = document.querySelector('.storyContainer');
  const storySection = document.querySelectorAll('.storySection');
  const storyInfoDiv = document.querySelectorAll('.storyInfoDiv');
  const storyAuthorNameDiv = document.querySelectorAll('.storyAuthorName');
  const storyAuthorNameLink = document.querySelectorAll('.storyAuthorName a')
  const storyLinkDiv = document.querySelectorAll('.storyLink');
  const storyLink = document.querySelectorAll('.storyLink a');
  const storyCreatedAtDiv = document.querySelectorAll('.storyCreatedAt')
  const createBookmarkDiv = document.querySelectorAll('.createBookmarkButtonFeed')
  const bookmarkButtonFeed = document.querySelectorAll('.bookmarkButtonFeed')
  const storyPicDiv = document.querySelectorAll('.storyPicDiv');
  const storyImgDiv = document.querySelectorAll('.storyImgDiv');

  /*
      TODO  When user clicks bookmark tab 
  ?           change bookmark img to red one
      TODO  When user clicks author link, story link
  ?           set as active when navigating back to feed
      TODO  
  */
  // createBookmarkButton.addEventListener('click', (e) => {
  //   alert('hi')
  // })
  bookmarkButtonFeed[0].addEventListener('click', (e) => {
    // e.preventDefault();
      //  alert('worked')
    // if (e.target.tagName === 'DIV') {
      e.target.classList.toggle('clicked');
    // }
  }, false);


});

