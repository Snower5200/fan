$(function() {
    var form = layui.form
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '长度在1-6之间'
            }
        }
    })
    initUserInfo()
        // 初始化用户信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('获取信息失败!')
                }
                form.val('formUserinfo', res.data)
            }
        })
    }
    // 重置表单数据
    $("#btnreset").on('click', function(e) {
            // 阻止默认行为
            e.preventDefault()
            initUserInfo()
        })
        // 监听表单提交事件
    $(".layui-form").on('submit', function(e) {
        e.preventDefault();
        // 发起请求
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新失败！')
                }
                layer.msg('更新成功')
                    // 调用父页面中的方法，重新渲染头像和用户信息
                window.parent.getUserInfo()

            }
        })
    })
})