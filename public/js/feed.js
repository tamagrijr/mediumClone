window.addEventListener('DOMContentLoaded', async () => {
  const feedContainer = document.querySelector('.feedContainer');
  // let stories = await fetch('/api/stories');
  // stories = await stories.json();
  // stories.forEach(async story => {
  //   let storyContainer = document.createElement('article');
  //   feedContainer.appendChild(storyContainer);
  //   let list = document.createElement('ul');
  //   let storyTitle = document.createElement('li');
  //   let titleLink = document.createElement('a');
  //   storyTitle.appendChild(titleLink);
  //   titleLink.setAttribute('href', `http://localhost:3000/stories/${ story.id }`);
  //   titleLink.innerHTML = story.title;
  //   let storyAuthor = document.createElement('li');
  //   storyAuthor.innerHTML = `${ story.Author.firstName } ${ story.Author.lastName }`;
  //   let storyDate = document.createElement('li');
  //   let date = new Date(story.createdAt);
  //   let dateFormat = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });
  //   storyDate.innerHTML = dateFormat.format(date, dateFormat);
  //   storyContainer.appendChild(list);
  //   list.appendChild(storyTitle);
  //   list.appendChild(storyAuthor);
  //   list.appendChild(storyDate);
  // });
});


// article
//   ul
//     li title
//     li author first and last name
//     li date (createdAt/updatedAt)