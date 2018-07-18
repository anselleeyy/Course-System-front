let nginx_url = "http://127.0.0.1:8080";

function refresh() {
    $.ajax({
        type: "get",
        url: nginx_url + "/findAllElectives",
        data: { username: $.cookie("username") },
        dataType: "jsonp",
        jsonp: "callback",
        success: function (result) {
            console.log(result.electives);
            $.each(result.electives, function (i, item) {
                let content = "<tr>";
                content += "<td>" + (i+1) + "</td>";
                content += "<td>" + item.teach.course.courseName + "</td>";
                content += "<td>" + item.teach.course.courseId + "</td>";
                content += "<td>" + item.teach.teacher.teaName + "</td>";
                content += "<td>" + item.teach.course.courseHour + "</td>";
                content += "<td>" + item.teach.course.credit + "</td>";
                content += "<td>" + item.teach.course.property + "</td>";
                content += "<td><button class='layui-btn layui-btn-mini layui-btn-danger' onclick='tuike(" + item.id + ")'>退课</button></td>";
                $("#course-list").append(content);
            })
        }
    });
}

$(function () {
    refresh();
});

function tuike(id) {
    console.log(id);
    $.ajax({
        type: "post",
        url: nginx_url + "/deleteElective",
        data: { electiveId: id },
        dataType: "jsonp",
        jsonp: "callback",
        success: function (result) {
            console.log(result);
            if (result.delStatus === "SUCCESS") {
                alert("退选成功");
                $("#course-list").remove();
                $("#course-table").append("<tbody id=\"course-list\"></tbody>");
                refresh();
            } else {
                alert("退选失败");
            }
        }
    })
}