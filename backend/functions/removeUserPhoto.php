<?php
session_start();
require_once "admin.php";
$userID = $_SESSION['login_user'];


/**
*Remove a specified user photo, cannot be retrieved
*@param $photoID int - the id of the photo to be removed
*@param $userID int - the id of the user wanting to remove the photo
*@return bool - true for success
*/
function removeUserPhoto($userID, $photoID){
	$db = connect_database();
	$query = $db->prepare("DELETE FROM UserPhotos WHERE UserID = ? AND PhotoID = ?");
    $query->execute($array($userID, $photoID));
    
    $check = $db->prepare("SELECT COUNT(PhotoID) FROM UserPhotos WHERE UserID = ? AND PhotoID = ?");
    $check->execute($array($userID, $photoID));
    if($check->fetchColumn() > 0){
    	echo json_encode(false);
    } else if ($check->fetchColumn() < 0) {
    	echo json_encode(false);
    } else{
    	echo json_encode(true);
    }
}