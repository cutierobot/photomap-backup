<?php
session_start();
require_once "admin.php";
$userID = $_SESSION['login_user'];
$country = $GET_['country'];

/**
*Update the users current country
*@param $userID int - the id of a user account
*@param $country string - the country that is now current
*@return bool - true if success
*/
try{
	$db = connect_database();
	$query = $db->prepare("UPDATE Users SET UserCountry = ? WHERE UserID = ?");
    $query->execute(array($country, $userID));
    //return true if success, false otherwise
} catch (PDOException $e) {
  $j['success'] = 'false';
  echo json_encode($j);
  return;
}
$j['success'] = 'true';
  echo json_encode($j);
  return;