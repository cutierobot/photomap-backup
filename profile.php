<!DOCTYPE html>
<html>
	<head>
		<title>Photo Map</title>
		<link rel="stylesheet" type="text/css" href="style.css">
		<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet"
		>
		<script src="js/jquery-3.2.1.min.js"></script>
		<!-- <script src="javascript/profile.js"></script> -->
	</head>
	<body>
	<?php session_start(); ?>
		<header>
			<a href="index.html">
				<img src="image/photoMap Logo.PNG" alt="PhotoMap logo">
			</a>
		</header>
		<ul>
			<li><a href="index.html">Map</a></li>
			<li><a href="upload.html">Upload</a></li>
			<li><a href="profile.html">Profile</a></li>
			<li id="signin"><a href="login.html"><?php if($_SESSION['login_user']){
				echo $_SESSION['login_user'];}
				else {echo "Signin"; } ?></a></li>
		</ul>
	
		<div class="wrapper">
		<!-- flexbox USE -->
			<div class="profile-lftSde">
				<h1>My Profile</h1>
				<div class="profilePictureContainer">
					<img id="profilePicture" src="image/defaultProfile.png">
					<div class="overlay">
						<a href="#">
							<span><img id="changeProfilePictureButton" src="image/changeProfilePicture.png"></span>
						</a>
					</div>
				</div>
				
			</div>
			<div class="profile-rghtSde">
				<h2>Name:</h2>
				<h2>Email:</h2>
				<div id="emailtext"><?php echo $_SESSION['login_user']; ?></div>

				<button class="chnge-psswd">Change Password</button>
				<button class="dlte-accnt">Delete Account</button>
			</div>
		</div>
		<script src="js/jquery.min.js" type="application/javascript"></script>
		<script>
		$(document).ready(function(){
			   $.ajax({
			      url:'backend/userdetails.php',
			      dataType: 'json',
			      complete: function (data) {
			          alert(data.email);
			          console.log(Object.prototype.toString.call(data));
			      },
			      error: function () {
			          $('#output').html('Bummer: there was an error!');
			      }
			  });
			return false;
		})
		</script>
	</body>
</html>