import { loggedIn } from './utils.js';
const navHeader = document.querySelector('.navHeader');
const topnav = document.querySelector('.topnav');
const footer = document.querySelector('.splashFooter');
const greeting = document.querySelector('.greetingTag')
const dropdownDiv = document.querySelector('#dropdown-menu')
const dropdownButton = document.querySelector('.dropdown-toggle')

const userId = window.localStorage.getItem('MEDIUM_CURRENT_USER_ID')
const logoutButton = document.querySelector('#logoutButton');

const profileButton = document.querySelector('#profileButton');
const writeStoryButton = document.querySelector('#createStoryButton')

const signInElement = document.querySelector('.signInButton');
const signUpElement = document.querySelector('.signUpButton');
const dropdownElement = document.querySelector('.dropdown');

document.addEventListener('DOMContentLoaded', async e => {
  let logged = loggedIn();
if (logged) {
  navHeader.classList.remove('navHeaderStyles');
  // navHeader.classList.remove('cardShadow')
  let user = await fetch(`/api/users/${logged}`);
    user = await user.json();
    greeting.innerHTML = `Hello, ${user.firstName}`
} else {
  footer.classList.remove('hidden')
  topnav.classList.remove('topNavStyles');
}

if (logged) {
  // navHeader.classList.remove('navHeaderStyles');
  let user = await fetch(`/api/users/${logged}`);
  user = await user.json();
  greeting.innerHTML = `Hello, ${user.firstName}`
  signInElement.classList.add('hidden');
  signUpElement.classList.add('hidden');
} else {
  footer.classList.remove('hidden')
  topnav.classList.remove('topNavStyles');
  dropdownElement.classList.add('hidden');
}
})

logoutButton.addEventListener('click', (e) => {
  localStorage.removeItem('MEDIUM_ACCESS_TOKEN');
  localStorage.removeItem('MEDIUM_CURRENT_USER_ID');
  window.location.href = "/";
})
profileButton.addEventListener('click', e => {
  window.location.href = `/users/${userId}`
})
writeStoryButton.addEventListener('click', e => {
  window.location.href = '/create'
})
dropdownButton.addEventListener('click', e => {
  dropdownDiv.classList.toggle('clickedDropdownMenu')
})
