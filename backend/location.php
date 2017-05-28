<?php 
	session_start();
	require_once "admin.php";
	$success = false;
	//location of photos
	if (isset($_POST["lat"]) && isset($_POST["lng"])) {
		$lat = $_POST["lat"];
		$lng = $_POST["lng"];
		$success = setCurrentLocation($lat, $lng);
	}
	echo $success;
 ?>
