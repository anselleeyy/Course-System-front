let nginx_url = "http://127.0.0.1:8080";

layui.use('form', function(){
	let form = layui.form;
});

$(function() {
	$("#loginButton").click(function() {
		let ident = $("#ident").val();
		let username = $("#username").val();
		if (username === "") {
			alert("请输入用户名");
			return;
		} else if ($("#password").val() === "") {
			alert("请输入密码");
			return;
		} else if (ident === "") {
			alert("请选择你的身份");
			return;
		}
		$.ajax({
			type: "post",
			url: nginx_url + "/login",
			data: $('#loginForm').serialize(),
			async: true,
			dataType: "jsonp",
			jsonp: "callback",
			success: function(result) {
				if (result.loginStatus === 'SUCCESS') {
					$.cookie("username", username);
					$.cookie("ident", ident);
					if (ident === "0") {
						window.location.href = "index-student.html";
					} else if (ident === "1") {
						window.location.href = "index-teacher.html";
					} else if (ident === "2") {
						window.location.href = "index-admin.html";
					}
				} else if (result.loginStatus === 'ERROR') {
					alert("用户名或密码错误");
					$("#loginForm")[0].reset();
				}
			},
			error: function() {
				console.log("error");
				alert("登录失败，请稍后再试")
			}
		});
	});
});



