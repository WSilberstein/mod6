let loginState = false;
let username;

$(document).ready(function() {
    showLoginButton(true);
})

$('#set-username-btn').click(function() {
    username = document.getElementById('username-input').value;
    setUsername(username);
    showLoginButton(false);
})

$('#logout-btn').click(function() {
    username = '';
    showLoginButton(true);
})


function showLoginButton(value) {
    if(value) {
        $('#show-login-btn').show();
        $('#show-logout-btn').hide();
    } else {
        $('#show-login-btn').hide();
        $('#show-logout-btn').show();
    }
}

function setUsername(username) {
    const match = /^\w+$/m;
    document.getElementById('show-username').innerText = "Welcome " + username;
}
