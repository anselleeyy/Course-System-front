let nginx_url = "http://127.0.0.1:8080";

function refreshTeacher() {
    $.ajax({
        type: "get",
        url: nginx_url + "/findTeachers",
        async: true,
        dataType: "jsonp",
        jsonp: "callback",
        success: function(result) {
            $.each(result.teacherList, function(i, item) {
                let content = "<tr>";
                content += "<td>" + (i + 1) + "</td>";
                content += "<td>" + item.teaName + "</td>";
                content += "<td>" + item.teaId + "</td>";
                content += "<td>" + item.department.departmentName + "</td>";
                content += "<td><button type='button' class='layui-btn layui-btn-mini layui-btn-danger' onclick='delTeacher(" + item.teaId + ")'>删除</button>" +
                           "<button type='button' class='layui-btn layui-btn-mini layui-btn-primary' onclick='changeToUpT("+ item.teaId + ")'>修改</button>"+
                           "</td>";
                content += "</tr>";
                $("#teacherBody").append(content);
            });
        }
    });
}

$(function() {
	refreshTeacher();
});

function delTeacher(id) {
	console.log(id);
	$.ajax({
        type: "post",
        url: nginx_url + "/deleteTeacher",
        async: true,
        data: { teaId: id },
        dataType: "jsonp",
        jsonp: "callback",
        success: function (result) {
            if (result.delStatus === "SUCCESS") {
                alert("教师" + id + "信息删除成功");
                $("#teacherBody").remove();
                $("#teacherTable").append("<tbody id='teacherBody'></tbody>");
                refreshTeacher();
            } else {
                alert("教师" + id + "信息删除失败！");
            }
            console.log(result);
        }
    })
}

function changeToUpT(id) {
    window.location.href = "teacher-modify.html?teaId=" + id;
}
