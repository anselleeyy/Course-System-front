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

$("#addClass").click(function () {
    $.ajax({
        type: "post",
        url: nginx_url + "/addClass",
        async: true,
        dataType: "jsonp",
        jsonp: "callback",
        data: $("#classForm").serialize(),
        success: function(result) {
            if (result.addStatus === "SUCCESS") {
                alert("班级信息添加成功！");
                $("#classForm")[0].reset();
            } else {
                alert("班级信息添加失败！请重新添加");
            }
        }
    });
});