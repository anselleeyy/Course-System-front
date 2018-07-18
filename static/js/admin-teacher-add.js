let nginx_url = "http://127.0.0.1:8080";

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

$("#addTeacher").click(function() {
    $.ajax({
        type: "post",
        url: nginx_url + "/addTeacher",
        async: true,
        dataType: "jsonp",
        jsonp: "callback",
        data: $("#teacherForm").serialize(),
        success: function(result) {
            if (result.addStatus === "SUCCESS") {
                alert("教师信息添加成功！");
                $("#teacherForm")[0].reset();
            } else {
                alert("教师信息添加失败！请重新添加");
            }
        }
    });
});