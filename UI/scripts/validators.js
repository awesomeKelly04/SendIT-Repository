validateSignupForm = () => {
    var fname = document.getElementById('fname').value,
        lname = document.getElementById('lname').value,
        pnumber = document.getElementById('pnumber').value,
        email = document.getElementById('email').value,
        username = document.getElementById('username').value,
        password = document.getElementById('password').value;
        repassword = document.getElementById('repassword').value;

    if (fname === "" || lname === "" || address === "" || pnumber === "" || email === "" || password === "" || username === "" || (password != repassword)) {
        alert("please all field are required");
        return false;
    }
    else {
        alert("You have successfully logged in");
        window.location.replace("../index.html");
        return false;
    }
}

trackPage = () => {
    window.location.replace("UI/tracking.html");
    return false;
}

validateSigninForm = () => {
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
        window.location.replace("../index.html");
        return false;
    }
}

