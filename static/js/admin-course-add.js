let nginx_url = "http://127.0.0.1:8080";
let teacherTime = [];
$.ajax({
    type: "get",
    url: nginx_url + "/findTeachers",
    async: true,
    dataType: "jsonp",
    jsonp: "callback",
    success: function (result) {
        $.each(result.teacherList, function (i, item) {
            let option = "<option value='" + item.teaId + "'>";
            option += item.teaName;
            option += "</option>";
            $("#teacherId").append(option);
        });

    }
});

$.ajax({
    type: "get",
    url: nginx_url + "/getAllClassrooms",
    async: true,
    dataType: "jsonp",
    jsonp: "callback",
    success: function (result) {
        $.each(result.classrooms, function (i, item) {
            let option = "<option value='" + item.claId + "'>";
            option += item.claName;
            option += "</option>";
            $("#claId").append(option);
        });

    }
});

layui.use(['form', 'jquery'], function() {
    var form = layui.form();
    form.on('select(getInfo)', function(data){
        // console.log(data.elem); //得到select原始DOM对象
        console.log(data.value); //得到被选中的值
        // console.log(data.othis); //得到美化后的DOM对象
        changeTime(data.value);
    });
    $(function() {

        $("#addCourse").click(function() {
            let courseName = $("#courseName").val();
            let courseId = $("#courseId").val();
            let teacherId = $("#teacherId").val();
            let courseHour = $("#courseHour").val();
            let credit = $("#credit").val();
            let property = $("#property").val();
            let claId = $("#claId").val();
            let teachLesson = "";
            console.log(courseHour + " " + credit + " " + property);
            for (let i = 0; i < 20; i++) {
                let val2 = i % 4 + 1;
                let val1 = parseInt(parseInt(i)/ 4) + 1;
                let valId = "#day_" + val1 + "_" + val2;
                if ($(valId).is(":checked") === true) {
                    if (teachLesson === "") {
                        teachLesson += (i+1);
                    } else {
                        teachLesson += "," + (i+1);
                    }
                }
            }

            // console.log(courseName);
            // console.log(courseId);
            // console.log(teacherId);
            // console.log(claId);
            // console.log(teachLesson);
            $.ajax({
                type: "post",
                url: nginx_url + "/addTeach",
                data: {
                    courseName: courseName,
                    courseId: courseId,
                    teacherId: teacherId,
                    claId: claId,
                    credit: credit,
                    property: property,
                    courseHour: courseHour,
                    teachLesson: teachLesson
                },
                dataType: "jsonp",
                jsonp: "callback",
                success: function (result) {
                    console.log(result);
                    if (result.addStatus === "SUCCESS") {
                        alert("课程添加成功");
                        $("#courseForm")[0].reset();
                    } else {
                        alert("课程添加失败，请重新添加");
                    }
                }
            })
        });

    });

    function changeTime(id) {
        teacherTime = [];
        for (let i = 1; i <= 5; i++) {
            for (let j = 1; j <= 4; j++) {
                let id = "#day_" + i + "_" + j;
                $(id).removeAttr("disabled");

            }
        }
        form.render('checkbox');
        $.ajax({
            type: "post",
            url: nginx_url + "/findTeachsByTeaId",
            data: {
                teaId: id
            },
            dataType: "jsonp",
            jsonp: "callback",
            success: function (result) {
                $.each(result.teachs, function (i, item) {
                    let time = item.time.split(",");
                    $.each(time, function (j, temp) {
                        let val2 = (temp) % 4;
                        if (val2 === 0) {
                            val2 = 4;
                        }
                        let val1 = parseInt(parseInt(temp-1)/ 4) + 1;
                        let valId = "#day_" + val1 + "_" + val2;
                        console.log(valId);
                        // form.on('checkbox(remove)', function(data){
                            $(valId).attr("disabled", "disabled");
                            form.render('checkbox');
                        // });

                    })
                });

            }
        })
    }


});