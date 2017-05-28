<?php
session_start();
require_once "admin.php";
$userID = $_SESSION['login_user'];
$lastName = $-GET['lastName'];

/**
*Update the first name of the user
*@param $userID int - the id of a user account
*@param $firstName string - the name of the user
*@return bool - true if successful
*/
try{
	$db = connect_database();
	$query = $db->prepare("UPDATE Users SET UserLastName = ? WHERE UserID = ?");
    $query->execute(array($lastName, $userID));

    //return true/falses
} catch (PDOException $e) {
  $j['success'] = 'false';
  echo json_encode($j);
  return;
}
$j['success'] = 'true';
  echo json_encode($j);
  return;