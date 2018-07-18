let nginx_url = "http://127.0.0.1:8080";

$("#addStu").click(function() {
    $.ajax({
        type: "get",
        url: nginx_url + "/addStudent",
        data: $("#stuForm").serialize(),
        dataType: "jsonp",
        jsonp: "callback",
        async: true,
        success: function(result) {
            if (result.addStatus === "SUCCESS") {
                alert("学生信息添加成功！");
                $("#stuForm")[0].reset();
            } else {
                alert("学生信息添加失败！请重新添加");
            }
        }
    });
});

layui.use(['layer', 'form'], function() {
    var layer = layui.layer;
    var form = layui.form();
    $.ajax({
        type: "get",
        url: nginx_url + "/findClasses",
        async: true,
        dataType: "jsonp",
        jsonp: "callback",
        success: function (result) {
            console.log(result);
            $.each(result.classList, function(i, item) {
                let option = "<option value='" + item.classId + "'>";
                option += item.className;
                option += "</option>";
                $("#classId").append(option);
                form.render();
            });
        }

    });
});
