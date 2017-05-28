<?php 
	session_start();
	require_once "admin.php";
	/**
	 * if user on mobile device, post is set
	 * if they are on desktop session is used instead
	 */
	if (isset($_POST["login_user"])) {
		$session = $_POST["login_user"];
	} else {
		$session = $_SESSION['login_user'];
	}
	$userId = getUserId($session);
	if (isset($_POST["locationId"]) && isset($_POST["photoId"])) {
		$locationId = $_POST["locationId"];
		$photoId = $_POST["photoId"];
		$success = finalUpload($locationId, $photoId, $userId);
		echo $success;
	}
 ?>
