const fetch = require('node-fetch');

const { api } = require('../config');

async function getAllStoryInfo(req) {
    const storyId = parseInt(req.params.id);
    let story = await fetch(`${ api }/api/stories/${ storyId }`);
    story = await story.json();
    let {
      title,
      body,
      authorId,
      createdAt
    } = story;
    createdAt = new Date(createdAt);
    let dateFormat = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit' });
    createdAt = dateFormat.format(createdAt, dateFormat);
    let author = await fetch(`${ api }/api/users/${ authorId }`);
    author = await author.json();
    const authorInfo = {
      authorId,
      authorFN: author.firstName,
      authorLN: author.lastName
    };
    let likes = await fetch(`${ api }/api/stories/${ storyId }/likes`);
    if (likes.statusCode === 200) {
      likes = await likes.json();
    } else {
      likes = [];
    }
    const likeCount = likes.length;
    let comments = await fetch(`${ api }/api/stories/${ storyId }/comments`);
    comments = await comments.json();
    if (comments.length) {
      comments = comments.map(comment => {
        let date = new Date(comment.createdAt);
        let created = dateFormat.format(date, dateFormat);
        comment = {
          id: comment.id,
          userId: comment.User.id,
          firstName: comment.User.firstName,
          lastName: comment.User.lastName,
          body: comment.body,
          created
        };
        return comment;
      });
      let userId = window.localStorage.getItem('MEDIUM_CURRENT_USER_ID')
      let bookmarks = await fetch(`${ api }/api/${ userId }/bookmarks`);
      if (bookmarks.statusCode === 200) {
        bookmarks = await bookmarks.json();
        bookmarks = bookmarks.map(bookmark => {
          bookmark = {
            userId: bookmark.authorId,
            storyId: bookmark.storyId
          }
          return bookmarks;
        })
      } else {
        return false;
      }
    }
    //todo get array of bookmarks for user
    //todo get array of followers for user
    const commentsCount = comments.length;
    const storyInfo = {
      storyId,
      title,
      body,
      createdAt,
      authorInfo,
      likeCount,
      comments,
      commentsCount,
      bookmarks
    };
    return storyInfo;
}

module.exports = {
  getAllStoryInfo
}
