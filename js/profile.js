/**
 * Determins what action the current user would like to do("check" or "set") profile image.
 * "check" - checks the database to see if current user has added a custom profile image. If
 * they have the stock profile iamge will be changed to there custom profile picture. else
 * the stock image will display until changed.
 * "set" - will set the or change the profile image in the databse and on the screen. will reload
 * page after image is set.
 * @param  {String} action check or set,
 * @param  {String} image  null or the image file to change to imgur link
 */
function inProfileTable(action, image) {
	switch (action) {
		case "check":
			$.post('backend/changeProfilePicture.php', { 
				"case": 'inTable',
			}, function(
				data) {
				if (data != "false") {
					console.log("has profile image");
					getProfileFromTable(data);
				} else {
					console.log("user doesn't have profile image");
					getProfileFromTable(false);
				}
			});
			break;
		case "set":
			$.post('backend/changeProfilePicture.php', { "case": 'inTable' }, function(
				data) {
				if (data != "false") {
					console.log("shouldn't be here");
					imgurProfile.upload(image, "change");
				} else {
					console.log("data: " + data);
					imgurProfile.upload(image, "create");
				}
			});
			break;
	}

}

/**
 * Retrieves the profile image from the ProfilePicture Table if the user has 
 * upload a profile picture. If the current user has not uplaoded a profile 
 * picture then the defualt stock image will be used until the user does upload
 * a image.
 *
 * This function is designed to be used on page load.
 * 
 * @param  {String} data The image from the databse to display as profile image.
 */
function getProfileFromTable(data) {
	if (data != false) {
		//User has a profile image set
		$.post('backend/changeProfilePicture.php', {
			"case": 'getProfile',
			"userId": data
		}, function(data, textStatus, xhr) {
			$("#profilePicture").attr('src', addImgur(data));
		});
	} else {
		$("#profilePicture").attr('src', 'image/defaultProfile.png');
	}
}

/*function isMobile() {
	try{
		document.createEvent("TouchEvent");
		alert("mobile device");
		return true;
	} catch(event){
		alert("not mobile");
		return false;
	}
}*/

/**
 * loads the users name and email into the span holders.
 */
function loadUserDetails() {
	$.post('backend/changeProfilePicture.php', { "case": 'getDetails' }, function(
		data, textStatus, xhr) {
		var obj = JSON.parse(data);
		$("#user-name").text(" " + obj.name);
		$("#user-email").text(" " + obj.email);
	});
}


$(document).ready(
	function() {
		loadUserDetails();
		inProfileTable("check", null);
		$("#profilePicture").hover(function() {
			$(".profile-overlay").show();
			$("#changeProfilePictureButton").show();
		}, function() {
			$(".profile-overlay").hide();
			$("#changeProfilePictureButton").hide();
		});
		$("#changeProfilePictureButton").click(function() {
			$("input[name='changeProfile']").click();
		});
		$("input[name='changeProfile']").change(function() {
			var input = $("input[name='changeProfile']");
			var file = input[0].files[0];
			inProfileTable("set", file);
		});
		// $("#delete-agree").click(function() {
		// 	console.log("delete account");
		// });
		$("#change-password-yes").click(function() {
			window.location = "change-password.html";
		});
		$("#delete-agree").click(function(event) {
			removeUser();
			////////////////////////////////////
			//jaymes removeUser.php function here //
			////////////////////////////////////
			// window.location = "index.html";
		});
	}
);
