<?php
session_start();
require_once "admin.php";
$userID = $_SESSION['login_user'];

/**
*Get the users DOB
*@param $userID int - the id of a user account
*@return array - contains interger representing the users DOB
*/
function getDOB($userID){
	$db = connect_database();
	$query = $db->prepare("SELECT UserDOB FROM Users WHERE UserID = ?");
    $query->execute(array($userID));
    $result= $query->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
}