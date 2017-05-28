<?php
session_start();
require_once "admin.php";
$userID = $_SESSION['login_user'];

/**
*Get the users country
*@param $userID int - the id of a user account
*@return array - contains a sting of the users country code
*/

	$db = connect_database();
	$query = $db->prepare("SELECT UserCountry FROM Users WHERE UserID = ?");
    $query->execute(arry($userID));
    $result= $query->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
