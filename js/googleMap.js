/*$(document).ready(function () {
	console.log("googleMap js loaded");
	function initMap() {
		//create a map object and specify the DOM element for display
		var map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: -27.4954306, lng: 153.0120301},
			zoom: 8
		});
	};
	initMap();
});*/

var autoComplete;
var locationJson;

function getAllLocations(map){
	$.get('../backend/locations.php', function (response) {
        var json = response;
        
   		for (var i = json.length - 1; i >= 0; i--) {
   			var id = json[i].LocationId;
   			var lat = parseFloat(json[i].Latitude);
   			var long = parseFloat(json[i].Longitude);
   			drawMarkersOnMap(id, lat, long, map);
   			
   		}
   	});
}

function drawMarkersOnMap(id, latitude, longitude, map){
		$.get('../backend/photo.php?ID='+id, function (response) {
			
		var address= response[0].PhotoAddress;
		
		var temp = '<img src="http://i.imgur.com/' + address + '" height="50" width="50">';
		
		var infowindow = new google.maps.InfoWindow({
          content: temp
        });
			var myLatLng = {lat: latitude, lng: longitude};
			var marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          title: 'Hello World!'
        });
		marker.addListener('click', function() {
        infowindow.open(map, marker);
        });
       });
}

function getPhoto(id){
	
		$.get('../backend/photo.php?ID='+id, function (response) {
			console.log(response[0].PhotoAddress);
			return response[0].PhotoAddress;
		});
}

/*Uses HTML5 geoLocation to get the current location of the user.*/
function getCurrentLocation() {
	if (!navigator.geolocation) {
		alert("GeoLocation is not supported by browser.");
		return;
	}
	return navigator.geolocation.getCurrentPosition(coordinates,
		displayErrorMessage);
}

/*Retrieves the latitude and longitude coordinates of the user
Parameters:
	location - getCurrentPosition passed location objects.*/
function coordinates(location) {
	var latitude = location.coords.latitude;
	var longitude = location.coords.longitude;
	alert("lat: " + latitude + "long: " + longitude);
	//so that it returns something, json object
	return { "latitude": latitude, "longitude": longitude };
}

/*Displays the error message to the user, as a alert, if a error is encountered.
Parameters:
	error - the error that is being thrown*/
function displayErrorMessage(error) {
	switch (error.code) {
		case error.PERMISSION_DENIED:
			alert("you denied permission for using your location.");
			break;
		case error.POSITION_UNAVAILABLE:
			alert("Location infomation is unavailable");
			break;
		case error.TIMEOUT:
			alert("location retrieval timed out");
			break;
	}
}

/*Allows users to search for the location using Google Place API.*/
function search() {
	var autoComplete = new google.maps.places.Autocomplete(document
		.getElementById('locationInput'));
	//when user selects address from dropdown gets coordinates of address
	google.maps.event.addListener(autoComplete, 'place_changed',
		function() {
			getCoordinates(autoComplete);
		}
	);
	console.log("searchhdfhdhs");
}

/*Takes the place location inputted by the user and retrieves longitude and 
latitude coordinates of that location.
Parameters:
	autoComplete - a Google AutoComplete class variable*/
function getCoordinates(autoComplete) {
	var place = autoComplete.getPlace();
	var lat = place.geometry.location.lat();
	var lng = place.geometry.location.lng();
	//make into JSON file or whatever
	console.log("%c typed lat: " + lat, "color: mediumseagreen");
	console.log("%c typed lng: " + lng, "color: mediumseagreen");
	locationJson = { "lat": lat, "lng": lng };
	$("input[name=locationSet]").prop('checked', 'true');
}


function initMap() {
	//create a map object and specify the DOM element for display
	var map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: -27.4954306, lng: 153.0120301},
		zoom: 8
	});
	getAllLocations(map);
}
