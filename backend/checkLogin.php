<?php 
	/*checks if the users has logged in or not
	Returns:
		yes if they are logged in and no if they are not logged in*/

	session_start();
	require_once "admin.php";
	// $has_session = session_id() !== '';
	if (isset($_SESSION['login_user'])) {
		echo "yes";
	} else {
		echo "no";
	}
	/*if (is_null($_SESSION['login_user'])) {
		// empty($_SESSION['login_user']) ||
		echo "no";
	} else {
		echo "yes";
	}*/

 ?>