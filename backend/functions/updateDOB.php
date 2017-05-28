<?php
session_start();
require_once "admin.php";
$userID = $_SESSION['login_user'];

/**
*Update the users dob
*@param $userID int - the id of a user account
*@param $dob int - new dob of the user
*@return bool - true if successful
*/
function updateDOB($userID, $dob){
	$db = connect_database();
	$query = $db->prepare("UPDATE Users SET UserDOB = ? WHERE UserID = ?");
    $query->execute(array($dob, $userID));

    //return true/falses
}