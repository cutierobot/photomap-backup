<?php
session_start();
require_once "admin.php";
$userID = $_SESSION['login_user'];
$photoID = $_GET["photoID"];
$long = $_GET["long"];
$lat = $_GET["lat"];

/**
NEEDS finishing
*/

/**
*
*@param $userID int - the id of a user account
*@return
*/
try{
	$db = connect_database();
	$query = $db->prepare("UPDATE Locations SET  FROM Users WHERE UserEmail = ?");
    
    $query->execute();
    $result= $query->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
} catch (PDOException $e) {
  $j['success'] = 'false';
  echo json_encode($j);
  return;
}
$j['success'] = 'true';
  echo json_encode($j);
  return;