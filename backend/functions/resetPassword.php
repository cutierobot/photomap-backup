<?php
session_start();
require_once "admin.php";
$userID = $_SESSION['login_user'];

/**
*Reset the users password
*@param $userID int - the id of a user account
*@return bool - true if success
*/
try{
	$db = connect_database();
	$query = $db->prepare("UPDATE Users SET UserPassword = ? WHERE UserID = ?");
	//put in salting function here 
    $query->execute(array($password, $userID));
    //return true if success, false otherwise
} catch (PDOException $e) {
  $j['success'] = 'false';
  echo json_encode($j);
  return;
}
$j['success'] = 'true';
  echo json_encode($j);
  return;
