let nginx_url = "http://127.0.0.1:8080";
let hrefUrl = window.location.href.split("?")[1];
let teaId = hrefUrl.split("=")[1];

$.ajax({
    type: "get",
    url: nginx_url + "/getAllDepartment",
    dataType: "jsonp",
    jsonp: "callback",
    async: true,
    success: function(result) {
        console.log(result);
        $.each(result.departmentList, function(i, item) {
            var option = "<option value='" + item.id + "'>";
            option += item.departmentName;
            option += "</option>";
            $("#departmentId").append(option);
        });

    }
});

layui.use(['layer', 'form'], function() {
    var layer = layui.layer;
    var form = layui.form();
    $.ajax({
        type: "get",
        url: nginx_url + "/findTeacherById",
        data: { teaId: teaId },
        dataType: "jsonp",
        jsonp: "callback",
        success: function (result) {
            console.log(result);
            $("#teaName").val(result.teacher.teaName);
            $("#teaId").val(teaId);
            $("#teaId").attr("disabled", "disabled");
            // $("#sex").val(result.teacher.sex);
            $(":radio[name='sex'][value='" + result.teacher.sex + "']").prop("checked", "checked");
            $(":radio[name='sex']").prop("disabled", "disabled");
            form.render("radio");
            $("#departmentId").val(result.teacher.department.id);
            form.render('select');

        }
    });
});

$("#modTeacher").click(function () {
    $.ajax({
        type: "post",
        url: nginx_url + "/updateTeacher",
        data: {
            teaId: teaId,
            teaName: $("#teaName").val(),
            depId: $("#departmentId").val()
        },
        dataType: "jsonp",
        jsonp: "callback",
        success: function (result) {
            if (result.updateStatus === "SUCCESS") {
                alert("更新成功！");
                window.location.href = "teacher-list.html";
            } else {
                alert("更新失败！")
            }

        }
    })

});