const commentSubmitBtn = document.getElementById('submitComment');
const commentForm = document.getElementById('commentForm');
const commentList = document.getElementById('commentList');
const currentUser = localStorage.MEDIUM_CURRENT_USER_ID;
const entireCommentArea = document.querySelectorAll('.wholeComment');
// const commentOptions = document.querySelectorAll('.comOps');

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
    originalCommentTextarea.value = "";
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

const optionButtons = document.querySelectorAll('.optBtn');
optionButtons.forEach(btn => {
  console.log('hiding the button');
  btn.style.display = 'none';
});

function showOptions(comArea) {
  console.log('showing options');
}

window.addEventListener('DOMContentLoaded', () => {
  console.log('content is loaded');
  entireCommentArea.forEach((comArea) => {
    comArea.addEventListener('mouseover', showOptions);
  });
});
// add event listeners to all comments for mouseover and mouseout
  // add delete and edit buttons to the comment item
  // add event listeners to the comment item

// const originalCommentTextarea = document.getElementById('comment');

// window.addEventListener('DOMContentLoaded', async () => {
//   console.log("the content has loaded");
//   // create the edit button with
//   // class = editCommentBtn
//   // with text "Edit"
//   let editBtn = document.createElement('button');
//   editBtn.setAttribute('class', 'editCommentBtn');
//   editBtn.innerHTML = 'Edit';
//   console.log(editBtn);
//   // create the button to submit the comment edit
//   // with class = submitCommentEdit
//   let submitEdit = document.createElement('button');
//   submitEdit.setAttribute('class', 'submitCommentEdit');
//   // create the button to delete the comment with
//   // class = dltCommentBtn
//   // with text "Delete"
//   let dltBtn = document.createElement('button');
//   dltBtn.setAttribute('class', 'dltCommentBtn');
//   dltBtn.innerHTML = 'Delete';
//   //add an event listener to listen for when the edit button is clicked
//   const editBtnEventHandler = () => {
//     // grab the current comment (along with its li element that it is in)
//     let body = e.target.parent.childNodes[1];
//     // get the current comment text that is showing
//     let bodyTxt = body.innerHTML;
//     // create a new li element for editing the comment
//     let editview = document.createElement('li');
//     // get the parent of the current comment
//     let commentParent = body.parentNode;
//     // place the div for editing the comment before the current comment
//     commentParent.insertBefore(editview, body);
//     // remove the current comment from view
//     commentParent.removeChild(body);
//     //create a text area to accept new input
//     let editTxt = document.createElement('textarea');
//     // put the current comment text in the text field for editing
//     editTxt.value = bodyTxt;
//     // place the text area in the editview li
//     editview.appendChild(editTxt);
//     // place the submit edit button in the editview li
//     editview.appendChild(submitEdit);
//     //add an event listener to the edit submit button
//     submitEdit.addEventListener('click', async e => {
//       // get the editted text from the text area
//       let body = editTxt.value;
//       // grab the comment id
//       let commentId = commentParent.childNodes[commentParent.childNodes.length - 1].dataset.comment;
//       // send a patch request to update the comment with by using the comment id and the edited text
//       let commentRes = await fetch(`/comments/${ commentId }`, {
//         method: 'PATCH',
//         body: JSON.stringify({ body }),
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });
//       // await the new comment response
//       commentRes = await comment.json();
//       // create a new li to hold the new comment
//       let newComment = document.createElement('li');
//       // set the innerHTML of the new li to be the edited comment
//       newComment.innerHTML = commentRes.body;
//       // put the new comment above the edit comment area
//       commentParent.insertBefore(newComment, editview);
//       // remove the edit comment area
//       commentParent.removeChild(editview);
//     });
// };
// // add an event listener to listen for click event on the delete button
// const dltBtnEventHandler = async e => {
//   // get the whole li that holds all the information of the comment
//   let commentNode = e.target.parentNode.parentNode.parentNode.parentNode;
//   // get the ul that holds the list of comments
//   let listNode = commentNode.parentNode;
//   // remove the comment that the user wants to delete
//   listNode.removeChild(commentNode);
//   // delete the comment from the db using the a delete fetch call using the comment's id
//   await fetch(`/api/comments/${ e.target.parentNode.dataset.comment }`, {
//     method: 'DELETE'
//   });
// }
// // for all the comments in the list of comments, select the li.comOps to display the edit/delete buttons
// entireCommentArea.forEach(ops => {
//   // get the whole area where there is comment info
//   let commentInfoArea = ops.parentNode.parentNode;
//   // only if the comment belongs to the currently logged in user
//   if (ops.dataset.user === currentUser) {
//     // add an event listener to the whole comment information on hover/focus
//     entireCommentArea.addEventListener('mouseover', () => {
//       // show edit and delete buttons
//       ops.appendChild(editBtn);
//       editBtn.addEventListener('click', editBtnEventHandler);
//       ops.appendChild(dltBtn);
//       dltBtn.addEventListener('click', dltBtnEventHandler);
//     });
//     //add an event listener to the whole comment information on blur/unfocus
//     entireCommentArea.addEventListener('mouseout', () => {
//       // remove the edit and delete Buttons
//       ops.removeChild(editBtn);
//       ops.removeChild(dltBtn);
//     });
//   }
// });
// });
