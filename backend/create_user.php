<?php
/*
 * Takes 2 post args
 * username: The username for the user that is being created
 * password: The password for the user that is being created
 *
 * Note that this only creates users and does not authenticate them
 *
 * This page has the following return structure. On failed user creation:
 * {
 *      "success": false
 * }
 *
 * And on success:
 * {
 *      "success": true
 * }
 */
session_start();

require_once "admin.php";

header('Content-Type: application/json');
$second_password = random_str(32);
$success = false;
if (isset($_POST['username']) && isset($_POST['password'])) {
    $success = create_user($_POST['username'], $_POST['password'], $_POST['firstname'], $_POST['lastname'],$_POST['dobday'], $_POST['dobmonth'], $_POST['dobyear'], $_POST['country'], $second_password);
}

echo json_encode(["success" => $success, "failsafe" => $second_password]);
// => $second_password
