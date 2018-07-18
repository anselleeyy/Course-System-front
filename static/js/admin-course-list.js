let nginx_url = "http://127.0.0.1:8080";
let lessonTime = ["周一 8:00 - 9:35", "周一 9:55 - 11:30", "周一 13:30 - 15:05", "周一 15:25 - 17:00",
    "周二 8:00 - 9:35", "周二 9:55 - 11:30", "周二 13:30 - 15:05", "周二 15:25 - 17:00",
    "周三 8:00 - 9:35", "周三 9:55 - 11:30", "周三 13:30 - 15:05", "周三 15:25 - 17:00",
    "周四 8:00 - 9:35", "周四 9:55 - 11:30", "周四 13:30 - 15:05", "周四 15:25 - 17:00",
    "周五 8:00 - 9:35", "周五 9:55 - 11:30", "周五 13:30 - 15:05", "周五 15:25 - 17:00",
];

function xrCenter() {
    $.ajax({
        type: "get",
        url: nginx_url + "/findAllTeaches",
        async: true,
        dataType: "jsonp",
        jsonp: "callback",
        success: function(result) {
            console.log(result);
            $.each(result.teachs, function (i, item) {
                let content = "<tr id=tr-" + (i) + ">";
                content += "<td>" + (i+1) +"</td>";
                content += "<td>" + item.course.courseName + "</td>";
                content += "<td>" + item.course.courseId +"</td>";
                content += "<td class='hidden-xs'>" + item.classroom.claName +"</td>";
                content += "<td class='hidden-xs'>";
                let time = item.time.split(",");
                $.each(time, function (i, item) {
                    content += lessonTime[item-1] + "<br>";
                });
                content += "</td>";
                content += "<td>" + item.teacher.teaName +"</td>";
                content += "<td>" + item.course.courseHour +"</td>";
                content += "<td>" + item.course.credit +"</td>";
                content += "<td>" + item.course.property +"</td>";
                content += "<td><button class='layui-btn layui-btn-mini layui-btn-normal' onclick='delEle(" + item.id + ")'>删除</button></td>";
                $("#courses-list").append(content);
            });
        }
    });
}

$(function () {
    xrCenter();
});

function delEle(id) {
    console.log(id);
    $.ajax({
        type: "get",
        url: nginx_url + "/deleteTeach",
        async: true,
        data: { teachId: id },
        dataType: "jsonp",
        jsonp: "callback",
        success: function(result) {
            if (result.delStatus === "SUCCESS") {
                alert("删除成功！");
                $("#courses-list").remove();
                $("#courses-table").append("<tbody id='courses-list'></tbody>");
                refresh();
            } else {
                alert("删除失败！");
            }
        }
    })
}