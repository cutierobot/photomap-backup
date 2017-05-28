/*checks if the current user is logged on or not*/
function checkLogin() {
	$.post('backend/checkLogin.php', function(data) {
		if (data == "yes") {
			$("#profile-nav").show();
			$("#upload-nav").show();
			$("#signin").text("Signout");
			$("#signin").attr("href", "#signout");
			console.log("logged in");
			return true;
		}
		if (data == "no") {
			$("#profile-nav").hide();
			$("#upload-nav").hide();
			$("#signin").text("Signin");
			console.log("not logged in");
			return false;
		}
	});
}

/**
 * Displays a snackbar/toast on the screen. The text is depended on the users 
 * logged in state. If the user is not logged in the toast will state that they 
 * are not logged in. Else the text will state that the user is logged in.
 * @param  {Bool} result the result from the checkLogin function.
 */
function snackbar(message) {
	var x = document.getElementById("snackbar")

	var text = $("#snackbar").text(message);

	// Add the "show" class to DIV
	x.className = "show";

	// After 3 seconds, remove the show class from DIV
	setTimeout(function() { x.className = x.className.replace("show", ""); }, 3000);
}

/**
 * Logs out the current user and redirect to idex.html
 */
function logout() {
	$.post('backend/logout.php', function(data, textStatus, xhr) {
		console.log("logged out");
		window.location = "index.html";
	});
}

$(document).ready(function() {
	checkLogin();
});
