const commentSubmitBtn = document.getElementById('submitComment');
const commentForm = document.getElementById('commentForm');
const commentList = document.getElementById('commentList');
const currentUser = localStorage.MEDIUM_CURRENT_USER_ID;
const commentOptions = document.querySelectorAll('.comOps');

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
    const commentItem = document.createElement('li');
    const commentContainer = document.createElement('ul');
    commentItem.appendChild(commentContainer);
    const commentingUser = document.createElement('li');
    commentContainer.appendChild(commentingUser);
    const commentBody = document.createElement('li');
    commentContainer.appendChild(commentBody);
    const commentTime = document.createElement('li');
    commentContainer.appendChild(commentTime);
    let user = await fetch(`http://localhost:3000/api/users/${ currentUser }`);
    user = await user.json();
    commentingUser.innerHTML = `${ user.firstName } ${ user.lastName }`;
    commentBody.innerHTML = comment.body;
    let date = new Date(comment.createdAt);
    let dateFormat = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit' });
    commentTime.innerHTML = dateFormat.format(date, dateFormat);
    let commentsListItems = commentList.childNodes;
    commentList.insertBefore(commentItem, commentsListItems[0]);
  } catch (err) {
    console.error(err);
  }
});

// create the edit button with
// class = editCommentBtn
let editBtn = document.createElement('button');
editBtn.setAttribute('class', 'editCommentBtn');
editBtn.innerHTML = 'Edit';
let submitEdit = document.createElement('button');
submitEdit.setAttribute('class', 'submitCommentEdit');
let dltBtn = document.createElement('button');
dltBtn.setAttribute('class', 'dltCommentBtn');
dltBtn.innerHTML = 'Delete';
editBtn.addEventListener('click', () => {
  let body = e.target.parent.childNodes[1];
  let bodyTxt = body.innerHTML;
  let editview = document.createElement('div');
  let editTxt = document.createElement('textarea');
  editTxt.value = bodyTxt;
  editview.appendChild(editTxt);
  editview.appendChild(submitEdit);
  submitEdit.addEventListener('click', async e => {

  });
});
dltBtn.addEventListener('click', async e => {
  let commentNode = e.target.parentNode.parentNode.parentNode.parentNode;
  let listNode = commentNode.parentNode;
  listNode.removeChild(commentNode);
  await fetch(`/api/comments/${ e.target.parentNode.dataset.comment }`, {
    method: 'DELETE'
  });
});

commentOptions.forEach(ops => {
  if (ops.dataset.user === currentUser) {
    ops.addEventListener('focus', () => {
      ops.appendChild(editBtn);
      ops.appendChild(dltBtn);
    });
    ops.addEventListener('blur', () => {
      ops.removeChild(ops.childNodes[1]);
      ops.removeChild(ops.childNodes[1]);
    });
  }
})
