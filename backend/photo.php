<?php


session_start();
require_once "admin.php";

header('Content-Type: application/json');

	$id = $_GET["ID"];
    $db = connect_database();
    $statment = $db->prepare("SELECT PhotoAddress FROM Photos WHERE LocationId = ?");
    $statment->execute(array($id));
    $result= $statment->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($result);