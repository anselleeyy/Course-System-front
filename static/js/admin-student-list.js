let nginx_url = "http://127.0.0.1:8080";

function refreshStudent() {
    $.ajax({
        type: "get",
        url: nginx_url + "/findStudents",
        dataType: "jsonp",
        jsonp: "callback",
        success: function(result) {
            $.each(result.studentList, function (i, item) {
                let content = "<tr>";
                content += "<td>" + (i+1) + "</td>";
                content += "<td>" + item.stuName + "</td>";
                content += "<td>" + item.stuId + "</td>";
                content += "<td>" + item.clas.department.departmentName + "</td>";
                content += "<td>" + item.clas.className + "</td>";
                content += "<td>" + item.ethnic + "</td>";
                content += "<td><button type='button' class='layui-btn layui-btn-mini layui-btn-danger' onclick='delStudent(" + item.stuId + ")'>删除</button>" +
                            "<button type='button' class='layui-btn layui-btn-mini layui-btn-primary' onclick='changeToUp("+ item.stuId + ")'>修改</button>"+
                            "</td>";
                content += "</tr>";
                $("#student-list").append(content);
            })
        }
    });
}

$(function () {
    refreshStudent();
});

function delStudent(id) {
    console.log(id);
    $.ajax({
        type: "post",
        url: nginx_url + "/deleteStudent",
        async: true,
        data: { stuId: id },
        dataType: "jsonp",
        jsonp: "callback",
        success: function (result) {
            if (result.delStatus === "SUCCESS") {
                alert("学生" + id + "信息删除成功");
                $("#student-list").remove();
                $("#studentTable").append("<tbody id='student-list'></tbody>");
                refreshStudent();
            } else {
                alert("学生" + id + "信息删除失败！");
            }
            console.log(result);
        }
    })
}

function changeToUp(id) {
    window.location.href = "student-modify.html?stuId=" + id;
}
