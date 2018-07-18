let nginx_url = "http://127.0.0.1:8080";
let hrefUrl = window.location.href.split("?")[1];
let stuId = hrefUrl.split("=")[1];

$.ajax({
    type: "get",
    url: nginx_url + "/findClasses",
    async: false,
    dataType: "jsonp",
    jsonp: "callback",
    success: function (result) {
        console.log(result);
        $.each(result.classList, function(i, item) {
            let option = "<option value='" + item.classId + "'>";
            option += item.className;
            option += "</option>";
            $("#classId").append(option);
        });
    }

});

layui.use(['layer', 'form'], function() {
    var layer = layui.layer;
    var form = layui.form();
    $.ajax({
        type: "get",
        url: nginx_url + "/findStudentById",
        data: { stuId: stuId },
        dataType: "jsonp",
        jsonp: "callback",
        success: function (result) {
            console.log(result);
            $("#stuName").val(result.student.stuName);
            $("#stuId").val(stuId);
            $("#stuId").attr("disabled", "disabled");
            $("#classId").val(result.student.clas.classId);
            form.render('select');
            $("#cardNumber").val(result.student.cardNumber);
            $("#cardNumber").attr("disabled", "disabled");
            $("#birthDate").val(result.student.birthDate);
            $("#birthDate").attr("disabled", "disabled");
            $("#ethnic").val(result.student.ethnic);
            $("#ethnic").attr("disabled", "disabled");

        }
    });
});

$("#modStu").click(function () {
    $.ajax({
        type: "post",
        url: nginx_url + "/updateStudent",
        data: {
            stuId: stuId,
            stuName: $("#stuName").val(),
            claId: $("#classId").val()
        },
        dataType: "jsonp",
        jsonp: "callback",
        success: function (result) {
            if (result.updateStatus === "SUCCESS") {
                alert("更新成功！");
                window.location.href = "student-list.html";
            } else {
                alert("更新失败！")
            }

        }
    })

});