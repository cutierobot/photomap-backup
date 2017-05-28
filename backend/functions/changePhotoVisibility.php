<?php
session_start();
require_once "admin.php";
$userID = $_SESSION['login_user'];
$photoID = $_GET["ID"];

$toggle = 1; //this is temp

/**
*User wishes to change photo from public <-> private
*@param $userID int - the id of a user account
*@return
*/
try{
	$db = connect_database();
	$query = $db->prepare("UPDATE UserPhotos SET visibility = ? WHERE PhotoID = ?");
    $query->execute(array($toggle, $photoID));
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