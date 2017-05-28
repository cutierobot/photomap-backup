<?php
session_start();
require_once "admin.php";
$userID = $_SESSION['login_user'];

/**
*Return last name
*@param $userID int - the id of a user account
*@return result is a string format of the users last name
*/
	$db = connect_database();
	$query = $db->prepare("SELECT UserLastName FROM Users WHERE UserID = ?");
    $query->execute(array($userID));
    $result= $query->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);