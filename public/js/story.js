const commentSubmitBtn = document.getElementById('submitComment');
const commentForm = document.getElementById('commentForm');
const commentList = document.getElementById('commentList');
const commentText = document.getElementById('comment');
const currentUser = localStorage.MEDIUM_CURRENT_USER_ID;

commentSubmitBtn.addEventListener('click', async e => {
  e.preventDefault();

  const formData = new FormData(commentForm);
  const commentData = formData.get('comment');

  try {
    let comment = await fetch(`/api/stories/${ commentForm.dataset.story }/comments`, {
      method: 'POST',
      body: JSON.stringify({ body: commentData, userId: currentUser }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    comment = await comment.json();

    // li(class= "full-comment") => commentItem
    //   ul(class= "comment-ul") => commentContainer
    //     li(class= "commenting-user") => commentingUser = fn ln
    //     li(class= "comment-body") => commentBody = comment text
    //     li(class= "comment-time") => commentTime = Oct 10, 9:17 AM
    //     li(class= "my-comment-options")
    //       button(class="Edit") Edit
    //       button(class="Delete") Edit

    // img(src="/icons/avatar (1).svg")
    const commentItem = document.createElement('li');
    commentItem.setAttribute('class', 'full-comment');
    commentItem.setAttribute('data-commentid', comment.id);
    const commentContainer = document.createElement('ul');
    commentContainer.setAttribute('class', 'comment-ul');
    commentItem.appendChild(commentContainer);
    const commentingUser = document.createElement('li');
    commentingUser.setAttribute('class', 'commenting-user');
    commentContainer.appendChild(commentingUser);
    const commentBody = document.createElement('li');
    commentBody.setAttribute('class', 'comment-body');
    commentContainer.appendChild(commentBody);
    const commentTime = document.createElement('li');
    commentTime.setAttribute('class', 'comment-time');
    commentContainer.appendChild(commentTime);
    const myCommentOptions = document.createElement('li');
    myCommentOptions.setAttribute('class', 'my-comment-options');
    commentContainer.appendChild(myCommentOptions);
    const myCommentEditBtn = document.createElement('button');
    myCommentEditBtn.setAttribute('class', 'editBtn');
    myCommentEditBtn.innerHTML = 'Edit';
    myCommentOptions.appendChild(myCommentEditBtn);
    const mmyCommentDltBtn = document.createElement('button');
    mmyCommentDltBtn.setAttribute('class', 'dltBtn');
    mmyCommentDltBtn.innerHTML = 'Delete';
    myCommentOptions.appendChild(mmyCommentDltBtn);

    myCommentOptions.style.display = 'none';
    commentContainer.addEventListener('mouseover', () => {
      myCommentOptions.style.display = 'block';
    });
    commentContainer.addEventListener('mouseout', () => {
      myCommentOptions.style.display = 'none';
    });

    let user = await fetch(`http://localhost:3000/api/users/${ currentUser }`);
    user = await user.json();

    commentText.value = "";

    let commentingUserName = document.createElement('span');
    let commentingUserImg = document.createElement('img');
    commentingUserImg.setAttribute('src', '/icons/avatar (1).svg');
    commentingUser.appendChild(commentingUserImg);
    commentingUserName.innerHTML = `${ user.firstName } ${ user.lastName }`;
    commentingUser.appendChild(commentingUserName);
    commentBody.innerHTML = comment.body;

    let date = new Date(comment.createdAt);
    let dateFormat = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
    commentTime.innerHTML = dateFormat.format(date, dateFormat);

    let commentsListItems = commentList.childNodes;
    commentList.insertBefore(commentItem, commentsListItems[0]);

    myCommentEditBtn.addEventListener('click', async (event) => {
      const fullCommentItem = event.target.parentNode.parentNode.parentNode;
      const commentBodyEl = fullCommentItem.querySelectorAll('.comment-body')[0];
      commentBodyEl.setAttribute('contenteditable', 'true');
      const submitNewCommentBtn = document.createElement('button');
      submitNewCommentBtn.innerHTML = 'Submit Edit';
      myCommentOptions.insertBefore(submitNewCommentBtn, myCommentEditBtn);
      myCommentOptions.removeChild(myCommentEditBtn);
      submitNewCommentBtn.addEventListener('click', async event => {
        let newCommentBody = commentBodyEl.innerHTML;
        await fetch(`http://localhost:3000/api/comments/${ fullCommentItem.dataset.commentid }`, {
          method: 'PATCH',
          body: JSON.stringify({ body: newCommentBody }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        commentBodyEl.removeAttribute('contenteditable');
        myCommentOptions.insertBefore(myCommentEditBtn, submitNewCommentBtn);
        myCommentOptions.removeChild(submitNewCommentBtn);
      });
    });

    mmyCommentDltBtn.addEventListener('click', async (event) => {
      const fullCommentItem = event.target.parentNode.parentNode.parentNode;
      commentList.removeChild(fullCommentItem);
      await fetch(`http://localhost:3000/api/comments/${ fullCommentItem.dataset.commentid }`, {
        method: 'DELETE'
      });
    });

  } catch (err) {
    console.error(err);
  }
});

window.addEventListener('DOMContentLoaded', async () => {
  // let follows = await fetch(`/api/users/${ currentUser }/follows`);
  // follows = await follows.json();
  // console.log(follows);
  // follows.map(f => f.Following.id );
  // document.querySelectorAll('.follow-button').forEach(btn => {
  //   if (follows.includes(btn.dataset.author)) {
  //     console.log('You are already following this user')
  //     btn.innerHTML = 'Unfollow';
  //   } else {
  //     console.log('You are not following this user');
  //     btn.innerHTML = 'Follow';
  //   }
  // });
  const eachComment = document.querySelectorAll('.full-comment');
  // const editButtons = document.querySelectorAll('.editBtn');
  // const deleteButtons = document.querySelectorAll('.dltBtn');
  eachComment.forEach(async comment => {
    const commentOptions = comment.querySelectorAll('.my-comment-options')[0];
    commentOptions.style.display = 'none';
    comment.addEventListener('mouseover', () => {
      if (comment.dataset.user === currentUser) {
        commentOptions.style.display = 'block';
      }
    });
    comment.addEventListener('mouseout', () => {
      commentOptions.style.display = 'none';
    })
    if (comment.dataset.user === currentUser) {
      const editButton = comment.querySelectorAll('.editBtn')[0];
      const deleteButton = comment.querySelectorAll('.dltBtn')[0];
      const myCommentOptions = comment.querySelectorAll('.my-comment-options')[0];
      editButton.addEventListener('click', async event => {
        const fullCommentItem = event.target.parentNode.parentNode.parentNode;
        const commentBodyEl = fullCommentItem.querySelectorAll('.comment-body')[0];
        commentBodyEl.setAttribute('contenteditable', 'true');
        const submitNewCommentBtn = document.createElement('button');
        submitNewCommentBtn.innerHTML = 'Submit Edit';
        myCommentOptions.insertBefore(submitNewCommentBtn, editButton);
        myCommentOptions.removeChild(editButton);
        submitNewCommentBtn.addEventListener('click', async event => {
          let newCommentBody = commentBodyEl.innerHTML;
          await fetch(`http://localhost:3000/api/comments/${ fullCommentItem.dataset.commentid }`, {
            method: 'PATCH',
            body: JSON.stringify({ body: newCommentBody }),
            headers: {
              'Content-Type': 'application/json'
            }
          });
          commentBodyEl.removeAttribute('contenteditable');
          myCommentOptions.insertBefore(editButton, submitNewCommentBtn);
          myCommentOptions.removeChild(submitNewCommentBtn);
        });
      });
      deleteButton.addEventListener('click', async event => {
        const fullCommentItem = event.target.parentNode.parentNode.parentNode;
        commentList.removeChild(fullCommentItem);
        await fetch(`http://localhost:3000/api/comments/${ fullCommentItem.dataset.commentid }`, {
          method: 'DELETE'
        });
      });
    }
  });

});

document.querySelectorAll('.bkmrk').forEach(bkmrk => {
  bkmrk.addEventListener('click', e => {
    if (e.target.classList.contains('bookmarked')) {
      document.querySelectorAll('.bkmrk').forEach(mrk => {
        mrk.setAttribute('src', '/icons/bookmark.svg');
        mrk.classList.remove('bookmarked');
      });
    } else {
      document.querySelectorAll('.bkmrk').forEach(mrk => {
        mrk.setAttribute('src', '/icons/bookmarked.svg');
        mrk.classList.add('bookmarked');
      });
    }
  });
});

// document.querySelectorAll('.follow-button').forEach(btn => {
//   btn.addEventListener('click', async () => {
//     const authorId = btn.dataset.author;
//     console.log('You are user #', currentUser);
//     let follow = await fetch(`/api/users/${ currentUser }/follows`, {
//       method: 'POST',
//       body: JSON.stringify({ followingId: authorId }),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
//     if (btn.innerHTML === 'Follow') {
//       btn.innerHTML = 'Unfollow';
//     } else {
//       btn.innerHTML = 'Follow';
//     }
//   });
// });