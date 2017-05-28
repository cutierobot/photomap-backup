function validation(){
var username = document.forms["login-form"]["username"].value;
var password = document.forms["login-form"]["password"].value;

var checkemail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	if(checkemail.test(username)){
		document.getElementById("username").style.backgroundColor = '#D0F0C0';
		submitemail= true;
	} else {
		document.getElementById("username").style.backgroundColor = '#FFFACD';
		submitemail = false;
	}
	//check password contains valid characters, atleast 7, no more than 32, atleast one digit and one special char
	var checkpassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,32}$/;
	if(checkpassword.test(password) && (password === password2)){
		document.getElementById("password").style.backgroundColor = '#D0F0C0';
		submitpassword = true;
	} else {
		document.getElementById("password").style.backgroundColor = '#FFFACD';
		submitpassword = false;
	}
	submitcheck = submitemail && submitpassword && submitfirstname && submitlastname && submitdob && submitcountry;
	var submitbtn = document.getElementById("submitbutton");
	if (submitcheck) {
        submitbtn.disabled = false;
    } else {
        submitbtn.disabled = true;
    }
return submitcheck;
}