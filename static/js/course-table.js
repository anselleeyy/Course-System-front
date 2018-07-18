let nginx_url = "http://127.0.0.1:8080";

$(function () {

    $("#tableStuName").text($.cookie("username"));
    $.ajax({
        type: "get",
        url: nginx_url + "/findAllElectives",
        data: { username: $.cookie("username") },
        dataType: "jsonp",
        jsonp: "callback",
        success: function (result) {
            console.log(result.electives);
            $.each(result.electives, function (i, item) {
                console.log(item.teach.time);
                let lessonTime = item.teach.time.split(",");
                $.each(lessonTime, function (j, res) {
                    console.log(res);
                    let courseName = item.teach.course.courseName;
                    let claName = item.teach.classroom.claName;
                    let teacherName = item.teach.teacher.teaName;
                    let lessonId = "#lesson-" + res;
                    $(lessonId).html(courseName + "<hr>" + claName + "<hr>" + teacherName);

                })
            })
        }
    })
});