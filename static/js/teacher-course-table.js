let nginx_url = "http://127.0.0.1:8080";

$(function () {

    $("#tableTeaName").text($.cookie("username"));
    $.ajax({
        type: "get",
        url: nginx_url + "/findTeachsByTeaId",
        data: { teaId: $.cookie("username") },
        dataType: "jsonp",
        jsonp: "callback",
        success: function (result) {
            console.log(result.electives);
            $.each(result.teachs, function (i, item) {
                let lessonTime = item.time.split(",");
                $.each(lessonTime, function (j, res) {
                    console.log(res);
                    let courseName = item.course.courseName;
                    let claName = item.classroom.claName;
                    let teacherName = item.teacher.teaName;
                    let lessonId = "#lesson-" + res;
                    $(lessonId).html(courseName + "<hr>" + claName + "<hr>" + teacherName);

                })
            })
        }
    });
});