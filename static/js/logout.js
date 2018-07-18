function logout() {
    $.cookie("username", null);
    window.location.href = "login.html";

}