$(function() {
    var layer = layui.layer
    getUserInfo()

    $("#btnlogout").on('click', function(e) {
        layer.confirm('确认退出?', { icon: 3, title: '提示' }, function(index) {
            // 清空token中存入的内容
            localStorage.removeItem('token')
                // 跳转到登录页面
            location.href = '/login.html'
                // 关闭询问框
            layer.close(index);
        });
    })
})


// 获取用户信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // 请求头配置,封装到baseAPI中统一设置
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg('获取信息失败')
            }
            //    调用渲染用户头像
            renderAvatar(res.data)
        },
        // complete: function(res) {
        //     // console.log(res);
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }
        // }
    })
}
//  渲染用户头像
function renderAvatar(user) {
    // 获取用户的名称
    var name = user.nickname || user.username;
    //设置欢迎的文本
    $("#welcome").html('欢迎&nbsp;&nbsp;' + name)
        // 按需渲染头像，如果没有，取名字的第一个字母
        // 渲染图片头像
    if (user.user_pic !== null) {
        $(".layui-nav-img").attr('src', user.user_pic).show()
        $(".text-avatar").hide()
    } else {
        // 渲染文本头像
        $(".layui-nav-img").hide()
        var first = name[0].toUpperCase()
        $(".text-avatar").html(first).show()
    }
}