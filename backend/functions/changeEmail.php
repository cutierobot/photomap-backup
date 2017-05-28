<?php
session_start();
require_once "admin.php";
$userID = $_SESSION['login_user'];
$email = $_GET['email'];

/**
*User wishes to change email account
*@param $userID int - the id of a user account
*@return bool - true on success
*/

try{
	$db = connect_database();
	$query = $db->prepare("UPDATE Users SET UserEmail = ? WHERE UserID = ?");
    $query->execute(array($email, $userID));
    //return true if success, false otherwise
} catch (PDOException $e) {
  $j['success'] = 'false';
  echo json_encode($j);
  return;
}
$j['success'] = 'true';
  echo json_encode($j);
  return;
