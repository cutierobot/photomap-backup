<?php
session_start();
require_once "admin.php";
header('Content-Type: application/json');
$email = $_SESSION['login_user'];
echo json_encode(['email' => $_SESSION['login_user'], 'firstname' => 'jon']]);
/*
if($email){
	$db = connect_database();
	$query = $db->prepare("SELECT UserFirstName, UserLastName, UserDOB, UserCountry FROM Users WHERE UserEmail = ?");
    $query->execute(array($email));
    $user = array();
	$user['header'] = $query->fetch(PDO::FETCH_NUM);   //or: $statement->fetchAll()[0]
    echo json_encode(['email' => $_SESSION['login_user'], 'firstname' => 'jon']]);
}
return null;
?>*/