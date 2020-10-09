const fetch = require('node-fetch');

async function getAllStoryInfo(req) {
    const storyId = parseInt(req.params.id);
    let story = await fetch(`http://localhost:3000/api/stories/${ storyId }`);
    story = await story.json();
    const {
      title,
      body,
      authorId
    } = story;
    let author = await fetch(`http://localhost:3000/api/users/${ authorId }`);
    author = await author.json();
    const authorInfo = {
      authorId,
      authorFN: author.firstName,
      authorLN: author.lastName
    };
    let likes = await fetch(`http://localhost:3000/api/stories/${ storyId }/likes`);
    if (likes.statusCode === 200) {
      likes = await likes.json();
    } else {
      likes = [];
    }
    const likeCount = likes.length;
    let comments = await fetch(`http://localhost:3000/api/stories/${ storyId }/comments`);
    if (comments.statusCode === 200) {
      comments = await comments.json();
    } else {
      comments = [];
    }
    if (comments.length) {
      comments = comments.map( async (comment) => {
        let commentingUser = await fetch(`http://localhost:3000/api/users/${ comment.userId }`);
        commentingUser = await commentingUser.json();
        comment = {
          firstName: commentingUser.firstName,
          lastName: commentingUser.lastName,
          body: comment.body
        };
        return comment;
      });
    }
    const commentsCount = comments.length;
    const storyInfo = {
      title,
      body,
      authorInfo,
      likeCount,
      comments,
      commentsCount
    };
    return storyInfo;
}

module.exports = {
  getAllStoryInfo
}