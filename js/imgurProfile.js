var imgurProfile = {
	link: null,
	array: [],
	numberOfFiles: 0,
	upload: function(file, action) {
		/* Lets build a FormData object*/
		var form = new FormData();
		form.append("image", file); // Append the file
		var result = $.ajax({
				url: "https://api.imgur.com/3/image",
				dataType: "json",
				crossDomain: true,
				method: "POST",
				headers: {
					"Authorization": "Client-ID eb8758747e98b26"
				},
				processData: false,
				contentType: false,
				type: "POST",
				data: form,
				beforeSend: function(xhr) {
					loadShow();
					xhr.setRequestHeader("Authorization", "Client-ID eb8758747e98b26");
				},
				complete: function() {
					loadHide();
				}
			})
			.done(function() {
				// console.log("success");
				//http://i.imgur.com/UcHA0JL.jpg
				imgurProfile.link = JSON.parse(result.responseText).data.link;
				console.log("imgurProfile.link " + imgurProfile.link);
				imgurProfile.array.push(imgurProfile.seperate());
				console.log("imgurProfile.array[" + imgurProfile.array + "]");
				/*imgurProfile.numberOfFiles++;
				console.log("numberOfFIles: " + imgurProfile.numberOfFiles);*/
				setProfilePicture(action);
			})
			.fail(function() {
				console.log("%c error", "color:red");
			})
	},
	seperate: function() {
		var string = imgurProfile.link.lastIndexOf('/');
		string = imgurProfile.link.slice(++string);
		console.log("seperateLink: " + string);
		return string;
	}
};

/**
 * Appends imgur http stuff to the returned photo.
 * 
 * @param {String} file file to add imgur text to
 * @return {String} returns the href of the image from imgur
 */
function addImgur(file) {
	return "http://i.imgur.com/" + file;
}






function loadHide() {
	$(".loaderContainer").css('visibility', 'hidden');
}

function loadShow() {
	$(".loaderContainer").css('visibility', 'visible');
}




/**
 * Changes or sets the users profile picture to the one the user is attempting 
 * to upload to the ProfilePicture Table.
 * @param {File} image the image to change the profile picture to
 */
function setProfilePicture(action) {
	console.log("setImage: " + imgurProfile.array[0]);
	try {
		if (action != "create" || action != "change") throw "error with action input: " +
			action;

	} catch (err) {
		console.log("%c " + err, "color: red");
	}
	$.post('backend/changeProfilePicture.php', {
		"image": imgurProfile.array[0],
		"case": action
	}).done(function(data) {
		location.reload();
	});
}
