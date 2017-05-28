<?php
session_start();
require_once "admin.php";
$userID = $_SESSION['login_user'];
$locationID = $_GET['locationID'];

/**
*Gathers all photos at a specific location
*@param $locationID int - the id of a specific location
*@return array - return array of photoID's
*/

	$db = connect_database();
	$query = $db->prepare("SELECT PhotoID FROM Photos WHERE locationId = ?");
    $query->execute(array($locationID));
    $result= $query->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);