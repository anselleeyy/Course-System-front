let nginx_url = "http://127.0.0.1:8080";
let hrefUrl = window.location.href.split("?")[1];
let claId = hrefUrl.split("=")[1];

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
        url: nginx_url + "/findClasById",
        data: { claId: claId },
        dataType: "jsonp",
        jsonp: "callback",
        success: function (result) {
            console.log(result);
            $("#className").val(result.clas.className);
            $("#departmentId").val(result.clas.department.id);
            form.render('select');
            $("#specialty").val(result.clas.specialty);
            $("#year").val(result.clas.year);

        }
    });
});

$("#modClass").click(function () {
    $.ajax({
        type: "post",
        url: nginx_url + "/updateClass",
        data: {
            claId: claId,
            claName: $("#className").val(),
            depId: $("#departmentId").val(),
            specialty: $("#specialty").val(),
            year: $("#year").val()
        },
        dataType: "jsonp",
        jsonp: "callback",
        success: function (result) {
            if (result.updateStatus === "SUCCESS") {
                alert("更新成功！");
                window.location.href = "class-list.html";
            } else {
                alert("更新失败！")
            }

        }
    })

});