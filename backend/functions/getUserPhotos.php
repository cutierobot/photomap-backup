<?php
session_start();
require_once "admin.php";
$userID = $_SESSION['login_user'];


/**
*Get all the photos that a user has
*@param $userID int - the id of a user account
*@return array- return an array contain photo id's
*/

	$db = connect_database();
	$query = $db->prepare("SELECT * FROM UserPhotos WHERE UserID = ?");
    $query->execute(array($userID));
    $result= $query->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);