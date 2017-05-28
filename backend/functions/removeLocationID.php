<?php
session_start();
require_once "admin.php";
$userID = $_SESSION['login_user'];

/**
*Check if no photos exist at location, then remove
*@param $locationID int - the id of a user account
*@return bool - true if success, false otherwise
*/
function removeLocationID($locationID){
	$db = connect_database();
	if(numPhotosAtLocation($locationID)){
	$query = $db->prepare("DELETE FROM Locations WHERE LocationID = ?");
    $query->execute(array($loctionID));
    //check if successful here
	}
	return false;
}