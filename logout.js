function logout() {
    // Remove user authentication data, e.g., from localStorage
    localStorage.removeItem('userInfo');

    window.location.href = 'login.html';
}


const logoutButton = document.getElementById('logoutButton');
if (logoutButton) {
    logoutButton.addEventListener('click', logout);
}