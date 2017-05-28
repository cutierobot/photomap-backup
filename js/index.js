$("#login-form").submit(function(e) {

    // Stop the form from submitting so we can do it via AJAX
    e.preventDefault();

    $.post('backend/login.php', $('#login-form').serialize(), function(r) {
        if (r.auth === true) {
            snackbar("You have been logged in successfully");
            /*window.localStorage.login_user = r.username;
            console.log(r.username);*/
            setTimeout(function() { window.location = "index.html"; }, 3000);

        } else {
            snackbar("You aren't authorised to log in");
        }
    })
});
