/**
 * Global variable for holding the return status for the passwordValidator 
 * function. used for checking validity before sending to server.
 * @type {Boolean}
 */
var isValid = false;
/**
 * Validates the password being entered. Displays a red bar along with the 
 * appropriate message if input is invalid. Displays a green bar if the input is
 * valid and a message of valid password. A valid password is a password that 
 * contains at least one number, one uppercase, one lowercase, and one special 
 * character of !@#$%^&*
 * @return {Boolean} true if valid false otherwise.
 */
function passwordValidator() {
	var password = $("input[name='newPassword']").val();
	var confirmPassword = $("input[name='confirmNewPassword']").val();
	var submitcheck = false;
	//check password contains valid characters, at least 7, no more than 32, 
	//atleast one digit and one special char
	var validStyle = '5px solid green';
	var invalidStyle = '5px solid red';
	var numberCheck = /[0-9]/;
	var specialCharacterCheck = /[!@#$%^&*]/;
	var lowercase = /[a-z]/;
	var uppercase = /[A-Z]/;
	if (password == "" || confirmPassword == "") {
		validationMessage(4);
		console.log("fhjdsahfjsdhfhsdj");
		$("#confirm-new-password").css(
			"border-left", invalidStyle);
		$("#new-password").css(
			"border-left", invalidStyle);
		return false;
	}
	if (password === confirmPassword) {
		if (password.length < 6) {
			validationMessage(2);
			$("#confirm-new-password").css(
				"border-left", invalidStyle);
			$("#new-password").css(
				"border-left", invalidStyle);
			return false;
		} else if (password.length > 32) {
			validationMessage(3);
			$("#confirm-new-password").css(
				"border-left", invalidStyle);
			$("#new-password").css(
				"border-left", invalidStyle);
			return false;
		} else if (!lowercase.test(password)) {
			validationMessage(5);
			$("#confirm-new-password").css(
				"border-left", invalidStyle);
			$("#new-password").css(
				"border-left", invalidStyle);
			return false;
		} else if (!uppercase.test(password)) {
			validationMessage(6);
			$("#confirm-new-password").css(
				"border-left", invalidStyle);
			$("#new-password").css(
				"border-left", invalidStyle);
			return false;
		} else if (!numberCheck.test(password)) {
			validationMessage(7);
			$("#confirm-new-password").css(
				"border-left", invalidStyle);
			$("#new-password").css(
				"border-left", invalidStyle);
			return false;
		} else if (!specialCharacterCheck.test(password)) {
			validationMessage(8);
			$("#confirm-new-password").css(
				"border-left", invalidStyle);
			$("#new-password").css(
				"border-left", invalidStyle);
			return false;
		} else {
			$("#confirm-new-password").css({
				"border-left": validStyle,
				"background-color": 'green'
			});
			$("#new-password").css({
				"border-left": validStyle,
				"background-color": 'green'
			});
			isValid = true;
			return true;
		}
	} else {
		validationMessage(1);
		return false;
	}
}

/**
 * Displays a message on the  screen relating to the problem with there currently
 * enterd password.
 * @param  {Intenger} messageNumber the number related to the message to display
 */
function validationMessage(messageNumber) {
	var postman = $("#postman");
	postman.css('visibility', 'visible');
	console.log("validatormessage");
	switch (messageNumber) {
		case 1:
			postman.text("passwords do not match");
			break;
		case 2:
			postman.text("Password length must be at least 7 characters long");
			break;
		case 3:
			postman.text("Password length must be no more than 32 characters long");
			break;
		case 4:
			postman.text("password fields can not be blank");
			break;
		case 5:
			postman.text("password must contian at least one lowercase letter");
			break;
		case 6:
			postman.text("password must have at least 1 number");
			break;
		case 8:
			postman.text(
				"password must have at least one special character of any of the following: !@#$%^&*"
			);
			break;
		case 9:
			postman.text("Password is valid");
			break;
	}
}

$(document).ready(function() {
	$("#form").submit(function(event) {
		event.preventDefault();

		if (isValid) {
			var password = $("#new-password").val()
			$.post('backend/resetPassword.php', { "new-Password": password },
				function(data, textStatus, xhr) {
					////////////////////////////////////////////
					//jaymes to do with his fancy code thingo //
					////////////////////////////////////////////
				});
		}
	});
});
