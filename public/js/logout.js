const logoutButton = document.querySelector('#logoutButton');

logoutButton.addEventListener('click', (e) => {
    window.localStorage.removeItem('MEDIUM_ACCESS_TOKEN');
    window.localStorage.removeItem('MEDIUM_CURRENT_USER_ID');
})