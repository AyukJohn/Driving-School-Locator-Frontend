// this is for sending async data to the server and receiving same from the server




const form = document.getElementById("loginForm")

const email = document.getElementById("email");
const password = document.getElementById("password");

// const passwordConfirm = document.getElementById("password_confirm");




form.addEventListener("submit",(e) => {
    e.preventDefault();

    // Create a data object to send to the API
    const data = {
        email: email.value,
        password: password.value,
    };

    // Send a POST request to the external API (replace 'api_url' with the actual API URL)
    fetch('https://stagingap.fintabng.com/api/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'

        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {

        // Handle the API response here (e.g., show a success message or error message)

        console.log(data.access_token);

        if (data.access_token){

            localStorage.setItem('userInfo', data.access_token);

            window.location.href='search.html';

        }


    })
    .catch(error => {
        console.error('Error:', error);
    });
    
    
    
    email.value = '';
    password.value = '';

});














