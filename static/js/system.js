$.ajax({
    type: "get",
    url: "http://127.0.0.1:8080/returnSys",
    dataType: "jsonp",
    jsonp: "callback",
    success: function (result) {
        console.log(result.sysStatus);
        if (result.sysStatus === 1) {
            $("#switchMode").attr("checked", "checked");
        }
    }
});

layui.use(['form', 'element'], function() {
    var form = layui.form();
    var element = layui.element();
    form.render();
    //监听信息提交
    form.on('switch(switchTest)', function(data) {

            console.log(1);
            $.ajax({
                type: "get",
                url: "http://127.0.0.1:8080/updateSys",
                dataType: "jsonp",
                jsonp: "callback",
                success: function (result) {
                    console.log(result.updateStatus);
                    if (result.updateStatus === "SUCCESS") {
                        alert("更新成功");
                    } else {
                        alert("更新失败！");
                    }
                }
            })

    });
});

