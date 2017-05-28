<?php
session_start();
require_once "admin.php";
$userID = $_SESSION['login_user'];

/**
*Update the first name of the user
*@param $userID int - the id of a user account
*@param $firstName string - the name of the user
*@return bool - true if successful
*/
function updateFirstName($userID, $firstName){
	$db = connect_database();
	$query = $db->prepare("UPDATE Users SET UserFirstName = ? WHERE UserID = ?");
    $query->execute(array($firstName, $userID));
    
    //return true/falses
}