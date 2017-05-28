<?php
// header("Access-Control-Allow-Origin: *");
session_start();
require_once "../admin.php";
// $userID = $_SESSION['login_user'];
if (isset($_POST["login_user"])) {
	$username = $_POST["login_user"];
} else {
	$username = $_SESSION['login_user'];
	echo "here1\n";
	$userIdD = getUserId($username)
	removeUser($userId);
	logout_user();
}

/**
*User wishes to delete their account, remove it and all its photos etc
*@param $userID int - the id of a user account
*@return bool - true if success
*/
function removeUser($userID){
	try{
		echo "userId" . $userID. "\n";
		$db = connect_database();
		echo "here3";
		$query = $db->prepare("DELETE FROM UserPhotos WHERE UserID = ?");
	    $query->execute(array($userID));
	    //check if happened correctly
	    $query2 = $db->prepare("DELETE FROM Users WHERE UserID = ?");
	    $query2->execute(array($userID));
	    echo "here4 end";
	    //check if happened correctly
	    //return true if success, false otherwise
	} catch(Exception $e){
		echo "removeUser error: ". $e->getMessage();
	}
}
