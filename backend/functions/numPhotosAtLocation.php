<?php
session_start();
require_once "admin.php";
$userID = $_SESSION['login_user'];
$loc = $_GET['locationID'];


	$db = connect_database();
	$query = $db->prepare("SELECT COUNT(PhotoID) FROM UserPhotos WHERE locationID = ?");
    $query->execute(array($loc));
    $result= $query->fetchAll(PDO::FETCH_ASSOC);
    echo $result->fetchColumn();

