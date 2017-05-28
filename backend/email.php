<?php 
	/*session_start();
	require_once "admin.php";*/

	// if (isset($_POST['email'])) {
        // $to = $_POST['email'];
    ini_set('display_errors', 1);
    error_reporting(E_ALL);
    $from = "mikaelasomerville@gmail.com";
		$to = "mikaela.somerville@uqconnect.edu.au";
		$subject = "Photomap Password Reset";
        $msg = "batman sent a email yo";
		/*$msg = '
<html>
<style type="text/css">
body,
html {
    font-family: "Roboto", sans-serif;
    margin: 0;
    background-color: #7D3750;
}

.button-reset {
    text-decoration: none;
    color: white;
    background-color: #B85D7E;
    padding: 10px;
    border-radius: 2px;
    margin: 0 calc(70%/2);
}

#title {
    text-align: center;
    margin: 0;
    background-color: #B85D7E;
    border-radius: 5px 5px 0 0;
    padding: 15px;
    color: #E7E6E6;
}

#card {
    padding: calc(55%/2);
    padding-top: 25px;
    padding-bottom: 25px;
}

#wrapper {
    margin: 50px;
    background-color: #EAEAEA;
    border-radius: 5px;
    color: #3A3636;
}

#end {
    padding-left: 10px;
}

#line-sep {
    height: 1px;
    border-bottom: 1px solid lightgrey;
}

#name {
    color: #B85D7E;
}

#footer {
    padding: 5px 50px;
    background-color: lightgrey;
    border-radius: 0 0 5px 5px;
    text-align: center;
}

#after-btn {
    margin-top: 30px;
}
</style>

<head>
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    <title>PhotoMap Password Reset</title>
</head>

<body>
    <!-- <div id="margin-wrap"> -->
    <div id="wrapper">
        <h1 id="title">PhotoMap</h1>
        <div id="card">
            <p>You recently requested to reset your password for your<span id="name"> PhotoMap </span>account</p>
            <p>Use the button below to reset it. This password reset is only valid for the next 24 hours.</p>
            <br>
            <a href="#" class="button-reset">Reset Password</a>
            <p id="after-btn">If you did not use PhotoMap or did not request a password reset, please ignore this email</p>
            <p>Thanks,</p>
            <p id="end">The PhotoMap Team</p>
            <div id="line-sep"></div>
            <p>If the above button does not work then copy and paste the below URL to your browser</p>
            <a id="active-url" href="#">url of reset password</a>
        </div>
        <div id="footer">
            <p>&copy 2017 PhotoMap. All Right Reserved.</p>
        </div>
    </div>
</body>
</html>
';*/
	// $headers = 'Content-type: text/html; charset=iso-8859-a';
    $headers = "From:". $from; 
	// $mail_sent = mail($to, $subject, $msg, $headers);
    // echo $mail_sent ? "mail sent" : "mail failed"; 
// }
    if (mail($to, $subject, $msg, $headers)) {
        echo "test email send.";
    } else {
        echo "failed to send";
    }
 ?>