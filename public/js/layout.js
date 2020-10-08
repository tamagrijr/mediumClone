import { loggedIn } from './utils.js';

const logoutButton = document.querySelector('#logoutButton');

const profileButton = document.querySelector('#profileButton');
const writeStoryButton = document.querySelector('#createStoryButton')
const signInLi = document.querySelector('.signInButton');
const signUpLi = document.querySelector('.signUpButton');
const dropdown = document.querySelector('.dropdown');

let logged = loggedIn();
if (logged) {
  signInLi.classList.add('hidden');
  signUpLi.classList.add('hidden');
} else {
  dropdown.classList.add('hidden');
}
logoutButton.addEventListener('click', (e) => {
  localStorage.removeItem('MEDIUM_ACCESS_TOKEN');
  localStorage.removeItem('MEDIUM_CURRENT_USER_ID');
  window.location.href = "/";
})
profileButton.addEventListener('click', e => {
  window.location.href = '/profile'
})
writeStoryButton.addEventListener('click', e => {
  window.location.href = '/create'
})
