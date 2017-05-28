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
	$kase = $_POST["case"];
	switch ($kase) {
		case 'getDetails':
			$userId = getUserId($session);
			$result = getDetails($userId);
			echo json_encode($result);
			break;

		case 'inTable':
			$userId = getUserId($session);
			$inTable = hasProfileImage($userId);
			if ($inTable == false) {
				echo "false";
			} else {
				echo "true";
			}
			break;
		case 'getProfile':
			$userId = getUserId($session);
			$result = getProfilePicture($userId);
			echo $result;
			break;
			
		case 'change':
			$profileImage = $_POST["image"];
			$userId = getUserId($session);
			$result = changeProfileImage($userId, $profileImage);
			if ($result) {
				echo "true";
			} else {
				echo "false";
			}
			break;

		case 'create':
			$profileImage = $_POST["image"];
			$userId = getUserId($session);
			$result = addToProfileTable($userId, $profileImage);
			if ($result) {
				echo "true";
			} else {
				echo "false";
			}
			break;
	}

 ?>