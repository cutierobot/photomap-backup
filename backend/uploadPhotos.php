<?php
	session_start();
	require_once "admin.php";
	$success = false;
	//location of photos
	if (isset($_POST["locationId"]) && isset($_POST["photoAddress"])) {
		$locationId = $_POST["locationId"];
		$photoAddress = $_POST["photoAddress"];
		$photoId = insertPhotos($locationId, $photoAddress);
	}
	echo $photoId;
?>