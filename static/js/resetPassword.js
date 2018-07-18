let nginx_url = "http://127.0.0.1:8080";

$(function() {
	let username = $.cookie("username");
	$("#username").val(username);
	
	$("#resetPassword").click(function() {
		let oldPassword = $("#oldPassword").val();
		let newPassword = $("#newPassword").val();
		let repeatPassword = $("#repeatPassword").val();
		if (oldPassword === "") {
			alert("请输入旧密码");
			return;
		} else if (newPassword === "") {
			alert("请输入新密码");
			return;
		} else if (repeatPassword === "") {
			alert("请再次输入新密码");
			return;
		} else if (newPassword !== repeatPassword) {
			alert("两次密码不同, 请重新填写");
			return;
		}
		$.ajax({
			type: "post",
			url: nginx_url + "/reset",
			data: {
			    "oldPassword": oldPassword,
				"newPassword": newPassword,
				"username": username,
				"ident": $.cookie("ident")
			},
			dataType: "jsonp",
			jsonp: "callback",
			async: true,
            success: function (result) {
                if (result.resetStatus === "SUCCESS") {
                    alert("密码更新成功");
                    $("#infoForm")[0].reset();
                    $("#username").val(username);
                } else if (result.resetStatus === "PWDERROR") {
                    alert("原始密码不正确，请重新输入！")
                } else {
                    alert("密码更新失败，请稍微重试！");
                }
            }
		});
	});
});
