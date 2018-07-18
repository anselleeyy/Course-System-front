let nginx_url = "http://127.0.0.1:8080";

function refresh() {
    $.ajax({
        type: "get",
        url: nginx_url + "/findClasses",
        dataType: "jsonp",
        jsonp: "callback",
        async: true,
        success: function (result) {
            $.each(result.classList, function (i, item) {
                let content = "<tr>";
                content += "<td>" + (i+1) + "</td>";
                content += "<td>" + item.className + "</td>";
                content += "<td>" + item.specialty + "</td>";
                content += "<td>" + item.department.departmentName + "</td>";
                content += "<td>" +
                    "<button class='layui-btn layui-btn-mini layui-btn-primary'onclick='upClass(" + item.classId + ")'>修改</button>"+
                    "<button class='layui-btn layui-btn-mini layui-btn-normal'>导出学生</button>" +
                    "</td>";
                content += "</tr>";
                $("#class-list").append(content);
            })
        }
    });
}

$(function () {
    refresh();
});

function upClass(id) {
    window.location.href = "class-modify.html?claId=" + id;
}