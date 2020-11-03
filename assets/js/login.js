$(function() {
    var form = layui.form
    var layer = layui.layer
        //点击去注册链接
    $("#link_reg").on('click', function() {
            $(".login-box").hide();
            $(".reg-box").show();
        })
        //点击去登录链接
    $("#link-login").on('click', function() {
        $(".reg-box").hide();
        $(".login-box").show();
    })
    form.verify({
        // 自定义pwd 校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function(value) {
            //后代选择器必须加空格.reg-box [name=password]
            var pwd = $(".reg-box [name=password]").val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    });
    // 监听注册表单的提交事件
    $("#form_reg").on('submit', function(e) {
        e.preventDefault();
        var data = {
            username: $("#form_reg [name=username]").val(),
            password: $("#form_reg [name=password]").val()
        }
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: data,
            success: function(res) {
                if (res.status !== 0) {
                    return console.log(res.message);
                }
                console.log('注册');
            }
        })

        // $.post('http://ajax.frontend.itheima.net/api/reguser', data, function(res) {
        //     // console.log(res);
        //     if (res.status !== 0) {
        //         return layer.msg('注册失败')
        //     }
        //     layer.msg('注册成功,请登录')
        //     //模拟点击登录事件
        //     $("#link-login").click()
        // })
    });
    // 监听登录表单的提交事件
    $("#form_login").submit(function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            // 快速获取表单的值
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                    // 登录成功的token字符串保存到localStorage
                localStorage.setItem('token', res.token)
                    // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})