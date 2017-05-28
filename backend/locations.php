<?php


session_start();
require_once "admin.php";

header('Content-Type: application/json');


    $db = connect_database();
    $statment = $db->prepare("SELECT * FROM Location");
    $statment->execute();
    $result= $statment->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
