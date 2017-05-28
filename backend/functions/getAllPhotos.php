<?php
session_start();
require_once "admin.php";
$userID = $_SESSION['login_user'];


/**
*Get all photos from the database
*@return array - an array contain all the photots and their attributes
*/
	$db = connect_database();
	$query = $db->prepare("SELECT * FROM UserPhotos");
    $query->execute();
    $result= $query->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);