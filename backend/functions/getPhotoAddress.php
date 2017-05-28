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

$db = connect_database();
$query = $db->prepare("SELECT PhotoAddress FROM Photos WHERE PhotoID = ?");
    
$query->execute(array($photoID));

//$result = true if successful
echo json_encode($result);

