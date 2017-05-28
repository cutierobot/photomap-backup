<?php 
	session_start();
	require_once "admin.php";
	echo "your loggin session is " . $_SESSION['UserEmail'];
	$result = getUserId($_SESSION['UserEmail']);
	echo "result: " . $result;
	//gets email of current loged in user
	
 ?>
