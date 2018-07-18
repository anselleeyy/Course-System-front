let nginx_url = "http://127.0.0.1:8080";
$(function() {
	let username = $.cookie('username');
	$("#loginName").text(username);
});

$.ajax({
	type: "get",
	url: nginx_url + "/returnSys",
	dataType: "jsonp",
    jsonp: "callback",
    success: function (result) {
        console.log(result);
        if (result.sysStatus === 0) {
            $("#disab").removeAttr("data-url");
            $("#disab").attr("onclick", "warn()");
        }
    }
});

function warn() {
    alert("选课系统已关闭")
}
