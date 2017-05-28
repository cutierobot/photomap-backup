var imgur = {
	// variable that stores the returned imgur http link
	link: null,
	// Array that stores all seperated, uploaded images for this session
	array: [],
	//variable holds the number of files uplaoded for this current session
	numberOfFiles: 0,
	/**
	 * Takes the file and converts the file to a image link.	
	 * @param  {File} file the image file to turn into a link
	 */
	upload: function(file) {
		var form = new FormData();
		form.append("image", file); // Append the file
		loadShow();
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
				success: function(data) {
					loadHide();
				},
				beforeSend: function(xhr) {
					xhr.setRequestHeader("Authorization", "Client-ID eb8758747e98b26");
				}
			})
			.done(function() {
				/**
				 * After the upload of the image has been completed this image 
				 * link will be saved to imgur.link and then seperated and pushed
				 * to the array to keep all the currently uplaoded images.
				 */
				imgur.link = JSON.parse(result.responseText).data.link;
				imgur.array.push(imgur.seperate());
				imgur.numberOfFiles++;
			})
			.fail(function() {
				console.log("%c error", "color:red");
			})
	},
	/**
	 * A function that returns the seperated imgur link to be stored in the 
	 * database. e.g. current image link may be "http://i.imgur.com/SAT0E5V.png"
	 * seperate will return "SAT0E5V.png"
	 * @return {String} the seperates link to be stored.
	 */
	seperate: function() {
		var string = imgur.link.lastIndexOf('/');
		string = imgur.link.slice(++string);
		return string;
	}
};

/**
 * Receives the seperated imgur link and adds back the imgur http stuff to make
 * it back into a link to the image.
 * @param {String} file the imgur string from the database to be retrieved.
 */
function addImgur(file) {
	return "http://i.imgur.com/" + file;
}

/**
 * Makes the loading screen hidden from the users using css.
 */
function loadHide() {
	$(".loaderContainer").css('visibility', 'hidden');
}

/**
 * Displays the loading screen to the users to show that there images are being
 * loaded onto the screen. When this window appears the images that the user has
 * just selected to be uploaded, are being  given to the imgur server to be 
 * converted into a http link to make image retreival easier.
 */
function loadShow() {
	$(".loaderContainer").css('visibility', 'visible');
}
