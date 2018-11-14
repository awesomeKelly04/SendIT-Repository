function validateSignupForm() {
    var fname = document.getElementById('fname').value,
        lname = document.getElementById('lname').value,
        address = document.getElementById('address').value,
        pnumber = document.getElementById('pnumber').value,
        email = document.getElementById('email').value,
        genderM = document.getElementById('genderM').value,
        genderF = document.getElementById('genderF').value,
        username = document.getElementById('username').value,
        password = document.getElementById('password').value;
        repassword = document.getElementById('repassword').value;

    if (fname === "" || lname === "" || address === "" || pnumber === "" || email === "" || password === "" || username === "" || (password != repassword) || (genderF === "" && genderM === "" )) {
        alert("please all field are required");
        return false;
    }
    else {
        alert("You have successfully logged in");
        window.location.replace("index.html");
        return false;
    }
}

function trackPage(){
    window.location.replace("tracking.html");
    return false;
}

function validateSigninForm() {
    var username = document.getElementById('username').value,
        password = document.getElementById('password').value;

    if (password === "" && username === "") {
        alert("please enter your username and password");
        document.getElementById('username').style.borderColor = "2px solid blue";
        document.getElementById('password').style.borderColor = "2px solid blue";
        return false;
    }
    else if (username === ""){
        alert("please enter your username");
        document.getElementById('username').style.borderColor = "2px solid blue";
        return false;
    }
    else if (password === ""){
        alert("please enter your password");
        document.getElementById('password').style.border = "2px solid blue";
        return false;
    }
    else {
        alert("You have successfully logged in");
        window.location.replace("index.html");
        return false;
    }
}

