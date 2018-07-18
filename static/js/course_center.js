let nginx_url = "http://127.0.0.1:8080";
let lessonTime = ["周一 8:00 - 9:35", "周一 9:55 - 11:30", "周一 13:30 - 15:05", "周一 15:25 - 17:00",
    "周二 8:00 - 9:35", "周二 9:55 - 11:30", "周二 13:30 - 15:05", "周二 15:25 - 17:00",
    "周三 8:00 - 9:35", "周三 9:55 - 11:30", "周三 13:30 - 15:05", "周三 15:25 - 17:00",
    "周四 8:00 - 9:35", "周四 9:55 - 11:30", "周四 13:30 - 15:05", "周四 15:25 - 17:00",
    "周五 8:00 - 9:35", "周五 9:55 - 11:30", "周五 13:30 - 15:05", "周五 15:25 - 17:00",
];

let coursesId = [];
let teachsId = [];
let eleTimes = [];

function getInfo() {
    coursesId = [];
    teachsId = [];
    eleTimes = [];
    $.ajax({
        type: "get",
        url: nginx_url + "/findAllElectives",
        async: false,
        data: { username: $.cookie("username") },
        dataType: "jsonp",
        jsonp: "callback",
        success: function(result) {
            $.each(result.electives, function (i, item) {
                coursesId.push(item.teach.course.courseId);
                teachsId.push(item.teach.id);
                let temp = item.teach.time.split(",");
                $.each(temp, function (j, res) {
                    eleTimes.push(res);
                });
            });
        }
    });
}

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
                if ($.inArray(item.id, teachsId) === -1 && $.inArray(item.course.courseId, coursesId) === -1) {
                    let content = "<tr id=tr-" + (i) + ">";
                    content += "<td>" + (i+1) +"</td>";
                    content += "<td hidden>" + item.id + "</td>";
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
                    let flag = 0;
                    $.each(time, function (temp, m) {
                        if ($.inArray(m, eleTimes) !== -1) {
                            flag = 1;
                        }
                    });
                    if (flag === 1) {
                        content += "<td><button type='button' disabled class='layui-btn layui-btn-mini layui-btn-danger'>冲突</button></td>";
                    } else {
                        content += "<td><button class='layui-btn layui-btn-mini layui-btn-normal' onclick='xuanke(" + item.id + ")'>选课</button></td>";
                    }

                    $("#center-body").append(content);
                }
            });
        }
    });
}

$(function() {

    getInfo();
    xrCenter();

});

function xuanke(id) {
    console.log(id);
    let teachId = id;
    console.log(teachId);
    let username = $.cookie("username");
    console.log(teachId + " " + username);
    $.ajax({
        type: "post",
        url: nginx_url + "/addElective",
        async: true,
        dataType: "jsonp",
        data: { username: username, teachId: teachId },
        jsonp: "callback",
        success: function (result) {
            console.log(result);
            if (result.addStatus === "SUCCESS") {
                alert("选课成功");
                $("#center-body").remove();
                $("#course-list").append("<tbody id='center-body'></tbody>");
                getInfo();
                xrCenter();

            } else {
                alert("选课失败");
            }
        }
    })
}