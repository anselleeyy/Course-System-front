let nginx_url = "http://127.0.0.1:8080";

let lessonTime = [
    "周一 8:00 - 9:35", "周一 9:55 - 11:30", "周一 13:30 - 15:05", "周一 15:25 - 17:00",
    "周二 8:00 - 9:35", "周二 9:55 - 11:30", "周二 13:30 - 15:05", "周二 15:25 - 17:00",
    "周三 8:00 - 9:35", "周三 9:55 - 11:30", "周三 13:30 - 15:05", "周三 15:25 - 17:00",
    "周四 8:00 - 9:35", "周四 9:55 - 11:30", "周四 13:30 - 15:05", "周四 15:25 - 17:00",
    "周五 8:00 - 9:35", "周五 9:55 - 11:30", "周五 13:30 - 15:05", "周五 15:25 - 17:00",
];

$.ajax({
    type: "get",
    url:  nginx_url + "/findTeachsByTeaId",
    data: { teaId: $.cookie("username") },
    dataType: "jsonp",
    jsonp: "callback",
    success: function (result) {
        console.log(result);
        $.each(result.teachs, function (i, item) {
            let content = "<tr>";
            content += "<td>" + (i+1) + "</td>";
            content += "<td>" + item.course.courseName + "</td>";
            content += "<td>" + item.course.courseId + "</td>";
            content += "<td>";
            let lesson = item.time.split(",");
            $.each(lesson, function (i, item) {
                content += lessonTime[item-1] + "<br>";
            });
            content += "</td>";
            content += "<td>" + item.classroom.claName + "</td>";
            content += "<td>" + item.course.courseHour + "</td>";
            content += "<td>" + item.course.credit + "</td>";
            content += "<td>" + item.course.property + "</td>";
            content += "<td><button type='button' class='layui-btn layui-btn-mini layui-btn-normal' onclick='tuike(" + item.id + ")'>导出学生</button></td>";
            $("#course-list").append(content);
        })
    }
});