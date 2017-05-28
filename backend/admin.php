<?php
/**

Special mention to Jack Kerr for his brilliant tutoring and indepth knowledge.
Most code and/or its ideas are sourced from  (Github: jack775544)

*/
header("Access-Control-Allow-Origin: *");

/**
 * Makes a database connection
 * @return PDO The connection to the database
 */
function connect_database()
{
	//login to access mysql db
    $servername = "localhost";
    $username = "toor";
    $password = "toorroot";

    try {
        $db = new PDO("mysql:host=$servername;dbname=photomap", $username, $password);
        // set the PDO error mode to exception
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }
    catch(PDOException $e)
        {
        $e->getMessage();
        }
    return $db;
}

/**
 * Encrypts a password into a strong hash
 * Logic taken from https://alias.io/2010/01/store-passwords-safely-with-php-and-mysql/
 * @param $password string The password to encrypt
 * @param $cost int The cost of the encryption, higher cost is more processing time but stronger hash
 * @return string A hash of the password
 */
function encrypt_password($password, $cost = 10)
{
    // Create a random salt
    $salt = strtr(base64_encode(mcrypt_create_iv(16, MCRYPT_DEV_URANDOM)), '+', '.');

    // Prefix information about the hash so PHP knows how to verify it later.
    // "$2a$" Means we're using the Blowfish algorithm. The following two digits are the cost parameter.
    $salt = sprintf("$2a$%02d$", $cost) . $salt;
    return crypt($password, $salt);
}


//copied from php.net comment
//for versions of php that do not have hash_equals implemented already
if(!function_exists('hash_equals')) {
  function hash_equals($str1, $str2) {
    if(strlen($str1) != strlen($str2)) {
      return false;
    } else {
      $res = $str1 ^ $str2;
      $ret = 0;
      for($i = strlen($res) - 1; $i >= 0; $i--) $ret |= ord($res[$i]);
      return !$ret;
    }
  }
}


/**
 * Checks a hash with a password from the database
 * @param $password string The password to check
 * @param $hash string The password from the database
 * @return bool true if matching, false if not
 */
function check_password($password, $hash)
{
    //$hash == crypt($password, $hash)
    return hash_equals($hash, crypt($password, $hash));
}

/**
 * Checks to see if the user can or is logged in and if given a username and password, log them in
 * @param $username string The username of the user to check
 * @param $password string The password of the user to check
 * @return bool True iff the user is authenticated
 */
function check_login($username = null, $password = null)
{
    // Check if their current session is valid
    if (isset($_SESSION['auth']) && (!isset($username) || !isset($password))) {
        return $_SESSION['auth'] == true;
    }

    // Set up database
    $db = connect_database();

    // Password auth next
    if (isset($username) && isset($password)) {
        $query = $db->prepare("SELECT UserEmail, UserPassword FROM Users WHERE UserEmail = ?");
        $query->execute(array($username));
        $user = $query->fetch(PDO::FETCH_NUM);
        // If we actually got a user back
        if ($user != false) {
            if (check_password($password, $user[1])) {
                $_SESSION['auth'] = true;
                $_SESSION['UserEmail'] = $username;
                return true;
            }
        }
    }

    // Their credentials don't match, so return a failure, failed auth results in potential embarrassment by peers,
    // hope of a password reset feature, and possibly drawing bad tarot cards. Also their session is no longer
    // authenticated.
    $_SESSION['auth'] = false;
    return false;
}

/**
* Returns the dob as int, 0 if incorrect or not of age
* @param $dobday string The dobday of the user to be created
* @param $dobmonth string The dobmonth of the user to be created
* @param $dobyear string The dobyear of the user to be created
* @return int date of birth, 0 if incorrect
*/

function check_dob($dobday, $dobmonth, $dobyear){
    $dm = intval($dobmonth);
    $dy = intval($dobyear);
    $dbb = intval($dobday);
    $dob = ($dy * 10000) + ($dm * 100) + $dbb;
    $currentdate = intval(date("Ymd"));
    if ((($currentdate - $dob) < 120000) || ($dob < 19000101)) {
        return 0;
    }
    if (!checkdate ($dm , $dbb , $dy )){
        return 0;
    }
    return $dob;
}


/**
 * Creates a user with the given username and password and inserts them into the database
 * Note that the created user is NOT authenticated
 * @param $username string The username of the user to be created
 * @param $password string The password of the user to be created
 * @param $firstname string The firstname of the user to be created
 * @param $lastname string The lastname of the user to be created
 * @param $dobday string The dobday of the user to be created
 * @param $dobmonth string The dobmonth of the user to be created
 * @param $dobyear string The dobyear of the user to be created
 * @param $country string The country of the user to be created
 * @return bool true iff the user was created successfully
 */
function create_user($username, $password, $firstname, $lastname, $dobday, $dobmonth, $dobyear, $country, $second_password) {
    $db = connect_database();
    //check dob
    
    $dob = 20010203;
    $dob = check_dob($dobday, $dobmonth, $dobyear);
    
    if ($dob == 0){
        return false;
    }
   
    //check_country
    if(strlen($country) != 2 ){
        return false;
    }
   
    //check names
    if((strlen($firstname) < 1 ) || (strlen($lastname) < 1 ) || (strlen($firstname) > 50 ) || (strlen($lastname) >50 )){
        return false;
    }
    
    if ((!preg_match("/^[a-zA-Z]*$/", $firstname)) || (!preg_match("/^[a-zA-Z]*$/",$lastname))) {
        return false;
    }

    //check password
    if((strlen($password) < 7 ) || (strlen($password) > 32 )){
        return false;
    }
    
    if ((!preg_match("/^.*(?=.*[0-9])(?=.*[!@#$%^&*]).*$/", $password))) {
        return false;
    }
   
    //check email/username
    if (!filter_var($username, FILTER_VALIDATE_EMAIL)) {
        return false;
    }
   
    // See if there is a duplicate username
    $query = $db->prepare("SELECT count(*) FROM Users WHERE UserEmail = ?");
    $query->execute(array($username));
    $count = $query->fetch(PDO::FETCH_NUM);
    $user_count = $count[0];

    
    // The username does not exist, so create user
    if ($user_count < 1) {
        $query = $db->prepare("INSERT INTO Users VALUES (?, ?, ?, ?, ?, ?, null, ?)");
        $query->execute(array($username, encrypt_password($password), $firstname, $lastname, $dob, $country, encrypt_password($second_password)));
        // User has been made, return success
        return true;
    }

    return false;
}
/*
*  FROM STACKOVERFLOW
*   User = https://stackoverflow.com/users/2224584/scott-arciszewski
    Question = https://stackoverflow.com/questions/4356289/php-random-string-generator/31107425#31107425
 * @param int $length      How many characters do we want?
 * @param string $keyspace A string of all possible characters
 *                         to select from
 * @return string
 */
function random_str($length, $keyspace = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
{
    $str = '';
    $max = mb_strlen($keyspace, '8bit') - 1;
    for ($i = 0; $i < $length; ++$i) {
        $str .= $keyspace[random_int(0, $max)];
    }
    return $str;
}



/* FROM PHP WEBSITE
*http://php.net/manual/en/function.random-int.php
* USER: s rotondo90 at gmail com
*Generate crypto secure int
*/



if (!function_exists('random_int')) {
    function random_int($min, $max) {
        if (!function_exists('mcrypt_create_iv')) {
            trigger_error(
                'mcrypt must be loaded for random_int to work', 
                E_USER_WARNING
            );
            return null;
        }
        
        if (!is_int($min) || !is_int($max)) {
            trigger_error('$min and $max must be integer values', E_USER_NOTICE);
            $min = (int)$min;
            $max = (int)$max;
        }
        
        if ($min > $max) {
            trigger_error('$max can\'t be lesser than $min', E_USER_WARNING);
            return null;
        }
        
        $range = $counter = $max - $min;
        $bits = 1;
        
        while ($counter >>= 1) {
            ++$bits;
        }
        
        $bytes = (int)max(ceil($bits/8), 1);
        $bitmask = pow(2, $bits) - 1;

        if ($bitmask >= PHP_INT_MAX) {
            $bitmask = PHP_INT_MAX;
        }

        do {
            $result = hexdec(
                bin2hex(
                    mcrypt_create_iv($bytes, MCRYPT_DEV_URANDOM)
                )
            ) & $bitmask;
        } while ($result > $range);

        return $result + $min;
    }
}



/*
Logs out user by removing their session.
*/
function logout_user(){
    try {
        session_unset();
    } catch (Exception $e) {
        return false;
    }
    return true;
}

/*------------------------------------*/
/**
*upload photos
*inserts the users current location into the database
* @param $lat - the latitude string of the current location
* @param $lng - the longitude string of the current location
* @return true if successful false if anything else
*/
/*function setCurrentLocation($lat, $lng)
{
    try {
        $db = connect_database();
        $statment = $db->prepare("INSERT INTO Location (Latitude, Longitude) VALUES (?, ?)");
        // $statment->bind_param("ss", $lat, $lng);
        $statment->execute(array($lat, $lng));
        
        echo "setCurrentLocation finished no error";
        return true;
    } catch (Exception $e) {
        echo "Error: " . $e->getMessage(); 
        return false;  
    }
}*/
/*------------------------------------*/
$locationId;
//upload photos
/*inserts the users current location into the database
Parameters:
    $lat - the latitude string of the current location
    $lng - the longitude string of the current location
Return:
    true if successful false if anything else*/
function setCurrentLocation($lat, $lng)
{
    try {
        $db = connect_database();
        $statment = $db->prepare("INSERT INTO Location (Latitude, Longitude) VALUES (?, ?)");
        $statment->execute(array($lat, $lng));
        $locationId = $db->lastInsertId();
        return $locationId;
    } catch (Exception $e) {
        echo "Error: " . $e->getMessage(); 
        return false;  
    }
}
/*gets the user id of the current logged in username
Pharameters:
    takes in the session id of the username
Returns:
    the user id of false if error*/
function getUserId($username)
{
    try {
        $db = connect_database();
        $statment = $db->prepare("SELECT UserId FROM Users WHERE UserEmail = :username");
        $statment->execute(array(":username" => $username));
        $row = $statment->fetchObject();
        // echo $row->UserId;
        return $row->UserId;
    } catch (Exception $e) {
        echo "error something went wrong" . $e->getMessage();
        return false;
    }
}

/*adds photos to databse table Photos
Pharameters:
    $locationId: the Auto incremented locationId for the photos to be is_uploaded
    $photoAddress: the address of the photos be be inserted
Returns:
    true if successful in uploading images, false otherwise.
*/
function insertPhotos($locationId ,$photoAddress)
{
    try {
        $db = connect_database();
        $statment = $db->prepare("INSERT INTO Photos (LocationId, PhotoAddress) VALUES (?, ?)");
        $statment->execute(array($locationId, $photoAddress));
        $photoId = $db->lastInsertId();
        // echo $photoId;
        // return true;
        return $photoId;
    } catch (Exception $e) {
        echo "error bro: " . $e->getMessage();
        return false;
    }
}

/**
 * Determins if the current user has a profile image in the ProfilePicture Table.
 * @param  String  $username the UserId of teh current logged in user
 * @return boolean           true if successful, false otherwise.
 */
function hasProfileImage($username)
{
    try {
        $db = connect_database();
        $statment = $db->prepare("SELECT count(*) FROM ProfilePicture WHERE UserId = ?");
        $statment->execute(array($username));
        $row = $statment->fetch(PDO::FETCH_NUM);
        if ($row[0] == 0) {
            return false;
            exit();
        } else {
	        return true;
        }
    } catch (Exception $e) {
        echo "error:)" . $e->getMessage();
    }
}

/**
 * Adds the current logged on user to the ProfilePicture Table and adds there image to the table.	
 * @param String $userId       The UserId for the current logged in user
 * @param String $profileImage The string representation for the http link to the imgur file.
 * @return Bool True if successful false otherwise.
 */
function addToProfileTable($userId, $profileImage)
{
	try {
        $db = connect_database();
        $statment = $db->prepare("INSERT INTO ProfilePicture (UserId, ProfilePicture) VALUES (?, ?)");
        $statment->execute(array($userId, $profileImage));
        return true;
    } catch (Exception $e) {
        echo "Error: " . $e->getMessage(); 
        return false;  
    }
}

/**
 * Changes to users ProfieImage in the ProfilePicture Table.
 * @param  String $userId       The UserId of the current logged in user
 * @param  String $profileImage The string representation of the imgur image link
 * @return Bool               true if function was successfully executed, false otherwise.
 */
function changeProfileImage($userId, $profileImage)
{
	try {
        $db = connect_database();
        $statment = $db->prepare("UPDATE ProfilePicture SET ProfilePicture = ? WHERE UserId = ?");
        $statment->execute(array($profileImage, $userId));
        return true;
    } catch (Exception $e) {
        echo "Error: " . $e->getMessage(); 
        return false;  
    }
}


/**
 * Retrieves the  profile image link from the database.
 * @param  String $userId The userId for the current logged in user
 * @return Bool,String         returns the profile image link if sucessful, 
 * false otherwise
 */
function getProfilePicture($userId)
{
	try {
        $db = connect_database();
        $statment = $db->prepare("SELECT ProfilePicture FROM ProfilePicture WHERE UserId = ?");
        $statment->execute(array($userId));
        $result = $statment->fetch(PDO::FETCH_OBJ);
        return $result->ProfilePicture;
    } catch (Exception $e) {
        echo "Error: " . $e->getMessage(); 
        return false;  
    }
}

/**
 * Retrieves and sends the current logged in users name and email from the database.
 * @param  String $userId the current logged in users is
 * @return Array,Bool         returns a aray for name and email of user, false otherwise
 */
function getDetails($userId)
{
    try {
        $db = connect_database();
        $statment = $db->prepare("SELECT UserEmail, UserFirstName, UserLastName FROM Users WHERE UserId = ?");
        $statment->execute(array($userId));
        $result = $statment->fetch(PDO::FETCH_OBJ);
        $name = $result->UserFirstName;
        $name .= " ";
        $name .= $result->UserLastName;
        $email = $result->UserEmail;
        return array("name" => $name, "email" => $email);
    } catch (Exception $e) {
        echo "Error: " . $e->getMessage(); 
        return false;  
    }
}

function deleteUser($userId)
{
    try {
        $db = connect_database();
        $statment = $db->prepare("DELETE FROM ");
        $statment->execute(array($userId));
        $result = $statment->fetch(PDO::FETCH_OBJ);
        $name = $result->UserFirstName;
        $name .= " ";
        $name .= $result->UserLastName;
        $email = $result->UserEmail;
        return array("name" => $name, "email" => $email);
    } catch (Exception $e) {
        echo "Error: " . $e->getMessage(); 
        return false;  
    }
}

function getPhotoId($photoName)
{
    
    try {
        $db = connect_database();
        $statment = $db->prepare("SELECT PhotoID, UserFirstName, UserLastName FROM Users WHERE UserId = ?");
        $statment->execute(array($userId));
        $result = $statment->fetch(PDO::FETCH_OBJ);
        $name = $result->UserFirstName;
        $name .= " ";
        $name .= $result->UserLastName;
        $email = $result->UserEmail;
        return array("name" => $name, "email" => $email);
    } catch (Exception $e) {
        echo "Error: " . $e->getMessage(); 
        return false;  
    }
}

function finalUpload($locationId, $photoId, $userId)
{
    try {
        $db = connect_database();
        $statment = $db->prepare("INSERT INTO UserPhotos (UserID, LocationId, PhotoID) VALUES (?, ?, ?)");
        $statment->execute(array($userId ,$locationId, $photoId));
        return true;
    } catch (Exception $e) {
        echo "error bro: " . $e->getMessage();
        return false;
    }
}