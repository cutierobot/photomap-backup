var domainFiles = 'https://infs3202-mibb3.uqcloud.net/backend/functions/'; //if remote (ie phonegap)

/*
var domainFiles = '/';
if local
*/

function changeUserProfilePicture(photoID){
		$.get(domainFiles+'changeUserProfilePicture.php?ID='+photoID, function (response) {
			if(response) {
				//update profile picute was successfull
			} else {
				//unsuccessful
			}
		});
}

function changePhotoVisibility(photoID){
		$.get(domainFiles+'changePhotoVisibilty.php?ID='+photoID, function (response) {
			if(response) {
				//update picute visibility was successfull
			} else {
				//unsuccessful
			}
		});
}

function changePhotoLocation(long, lat, photoID){
		$.get(domainFiles+'changePhotoLocation.php?long='+long+'&lat='+lat+'&photoID='+photoID, function (response) {
			if(response) {
				//change picture location was successfull
			} else {
				//unsuccessful
			}
		});
}

function changeEmail(email){
		$.get(domainFiles+'changeEmail.php?email='+email, function (response) {
				if(response) {
				//change email was successfull
			} else {
				//unsuccessful
			}

		});
}

function removeLocationID(locID){
		$.get(domainFiles+'removeLocationID.php?locationID='+locID, function (response) {
				if(response) {
				//remove location was successful
			} else {
				//unsuccessful
			}
		});
}

function numPhotosAtLocation(locID){
		$.get(domainFiles+'numPhotosAtLocation.php?locationID='+locID, function (response) {
			//expect number return
		});
}

function removeUser(){
		$.get(domainFiles+'removeUser.php', function (response) {
			console.log("success");
				if(response) {
				//update profile picture was successfull
				console.log("if responce " + response);
			} else {
				//unsuccessful
			}
		});
}

function resetPassword(){
		//will have to get their saved passphrase
		//then will have to update last stored password
		$.get(domainFiles+'resetPassword.php', function (response) {
			if(response) {
				//reset was successfull
			} else {
				//unsuccessful
			}
		});
}

function updateCountry(country){
		$.get(domainFiles+'updateCountry.php?country='+country, function (response) {
			if(response) {
				//update country successful
			} else {
				//unsuccessful
			}
		});
}

function getCountry(){
		$.get(domainFiles+'getCountry.php', function (response) {
			//response[0].UserCountry
		});
}

function updateDOB(dob){
		$.get(domainFiles+'updateDOB.php?dob='+dob, function (response) {
				if(response) {
				//update dob was successfull
			} else {
				//unsuccessful
			}
		});
}

function getDOB(){
		$.get(domainFiles+'getDOB.php', function (response) {
			//response[0].UserDOB
		});
}

function updateLastName(lastName){
		$.get(domainFiles+'updateLastName.php?lastName='+lastName, function (response) {
				if(response) {
				//update lastname
			} else {
				//unsuccessful
			}
		});
}

function getLastName(){
		$.get(domainFiles+'getLastName.php', function (response) {
			//response[0].UserLastName
		});
}

function updateFirstName(firstName){
		$.get(domainFiles+'updateFirstName.php?firstName='+firstName, function (response) {
			if(response) {
				//update first name
			} else {
				//unsuccessful
			}		});
}

function getFirstName(){
		$.get(domainFiles+'getFirstName.php', function (response) {
			//response[0].UserFirstName
		});
}

function getAllPhotos(){
		$.get(domainFiles+'getAllPhotos.php', function (response) {
				//response[i].PhotoID (put in loop based on length of array, either .length or .height or .size)
		});
}

function getUserPhotos(){
		$.get(domainFiles+'getUserPhotos.php', function (response) {
				//response[i].PhotoID (put in loop based on length of array, either .length or .height or .size)
		});
}

function getPhotoAddress(photoID){
		$.get(domainFiles+'getPhotoAddress.php?ID='+photoID, function (response) {
				//response[i].PhotoAddress
		});
}

function getImagesByLocation(locID){
		$.get(domainFiles+'getImagesByLocation.php?locationID='+locID, function (response) {
				//response[i].PhotoID (put in loop based on length of array, either .length or .height or .size)
		});
}

function removeUserPhoto(photoID){
		$.get(domainFiles+'removeUserPhoto.php?ID='+photoID, function (response) {
				if(response) {
				//remove picute was successfull
			} else {
				//unsuccessful
			}
		});
}