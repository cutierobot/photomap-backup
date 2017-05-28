<?php
session_start();
require_once "admin.php";
header('Content-Type: application/json');

$photoID = $_GET["ID"];
$userID = $_SESSION['login_user'];

/**
*Change the current users profile picture to another existing one in their collection
@param $userID int - the id of a user account
@return
*/
try{
$db = connect_database();
$query = $db->prepare("UPDATE Users SET UserProfilePicture = ? WHERE UserID = ?");
    
$query->execute(array($photoID, $userID));

} catch (PDOException $e) {
  $j['success'] = 'false';
  echo json_encode($j);
  return;
}
$j['success'] = 'true';
  echo json_encode($j);
  return;

