import $ from "jquery"
function register(){

    // 定义开关变量

    var flagUser = false
    var flagPwd = false
    var flagCpwd = false
    var flagEmail = false
    var flagAllow = false

    // 找到所在标签元素
    var $user_name = $('#username')
    var $email = $('#email')
    var $pwd = $('#password')
    var $cpwd = $('#rePassword')
    var $allow = $('#allow')
    var $submit = $('#login-form')

    // 1.如果失去焦点，则进行检查判断用户名是否合法
    $user_name.blur(function () {
        // 封装函数 调用函数
        fnCheckUser()
    })
    function fnCheckUser() {
        // 获取用户输入的数据
        var vals = $.trim($user_name.val())
        // 正则，正则验证用户输入的数据是否合法
        var re = /^\w{3,16}$/

        if (vals == '') {
            $user_name.next().text('请输入你的用户名')
            $user_name.parent().css("border-bottom","#fe5c55 1px solid")
            flagUser = false
            return
        }
        if (re.test(vals)) {
            // 合法 -- 隐藏报错信息
            $user_name.next().text('')
            $user_name.parent().css("border-bottom","#b2b8cb 1px solid")
            flagUser = true
        } else {
            // 不合法 -- 报错 -- 下面的span标签显示
            $user_name.next().text('用户名是3-16位数字、字母和下划线！')
            $user_name.parent().css("border-bottom","#fe5c55 1px solid")
            flagUser = false
        }
    }

    // 2.如果邮箱框失去焦点，则进行检查判断邮箱是否合法
    $email.blur(function () {
        // 封装函数，调用函数
        fnCheckEmail()
    })
    function fnCheckEmail() {
        // 获取邮箱框输入的数据
        var vals = $.trim($email.val())
        // 邮箱正则匹配表达式
        var reMail = /^[a-z0-9][\w\.\-]*@[a-z0-9\-]+(\.[a-z]{2,5}){1,2}$/
        // 如果输入框为空，则提示不能为空并return
        if (vals == '') {
            $email.next().text('请输入电子邮箱')
            $email.parent().css("border-bottom","#fe5c55 1px solid")
            flagEmail = false
            return
        }
        // 正则验证邮箱输入是否合法
        if (reMail.test(vals)) {
            // 如果匹配成功，则隐藏span标签
            $email.next().text('')
            $email.parent().css("border-bottom","#b2b8cb 1px solid")
            flagEmail = true
        }
        else {
            // 如果匹配失败，则显示span标签，替换提示信息
            $email.next().text('电子邮箱格式不正确')
            $email.parent().css("border-bottom","#fe5c55 1px solid")
            flagEmail = false
        }
    }

    // 3.如果密码框失去焦点，则进行检查判断密码是否合法
    $pwd.blur(function () {
        // 封装函数，调用函数
        fnCheckPwd()
    })
    function fnCheckPwd() {
        // 获取密码框输入的数据
        var vals = $.trim($pwd.val())
        // 密码正则匹配表达式
        var rePass = /^[\w!-@#$%^&*]{6,16}$/
        // 如果输入框为空，则提示不能为空并return
        if (vals == '') {
            $pwd.next().next().text('密码不能为空')
            $pwd.parent().css("border-bottom","#fe5c55 1px solid")
            flagPwd = false
            return
        }
        // 正则验证密码输入是否合法
        if (rePass.test(vals)) {
            // 如果匹配成功，则隐藏span标签
            $pwd.next().next().text('')
            $pwd.parent().css("border-bottom","#b2b8cb 1px solid")
            flagPwd = true
        }
        else {
            // 如果匹配失败，则显示span标签，替换提示信息
            $pwd.next().next().text('密码过短，请输入6-16位密码')
            $pwd.parent().css("border-bottom","#fe5c55 1px solid")
            flagPwd = false
        }
    }

    // 4.判断两次输入的密码是否一致
    $cpwd.blur(function () {
        // 封装函数，调用函数
        fnCheckCpwd()
    })
    function fnCheckCpwd() {
        // 获取重复密码框输入的数据
        var vals = $.trim($pwd.val())
        var cvals = $.trim($cpwd.val())
        if (cvals == '') {
            $cpwd.next().next().text('重复密码框不能为空')
            $cpwd.parent().css("border-bottom","#fe5c55 1px solid")
            flagCpwd = false
            return
        }
        if (vals == cvals) {
            $cpwd.next().next().text('')
            $cpwd.parent().css("border-bottom","#b2b8cb 1px solid")
            flagCpwd = true
        }
        else {
            $cpwd.next().next().text('两次密码输入不一致，请重新输入')
            $cpwd.parent().css("border-bottom","#fe5c55 1px solid")
            flagCpwd = false
            return
        }
    }

    // 5.点击同意协议复选框，判断是否勾选。如果勾选，则隐藏提示信息，没有勾选，则显示报错信息
    $allow.click(function () {
        fnCheckAllow()
    })
    // 封装函数
    function fnCheckAllow() {
        if ($allow.prop('checked')) {
            $allow.next().next().text('')
            flagAllow = true
        }
        else {
            $allow.next().next().text("请阅读并勾选同意协议")
            flagAllow = false
        }
    }

    //6.button
    $("#btnSubmit").attr("disabled", true);
    
    $(".login-input").bind('input propertychange', function(){
        var UserName = $.trim($user_name.val())
        var Email = $.trim($email.val())
        var Password = $.trim($pwd.val())
        var RePassword = $.trim($cpwd.val())
        if(UserName=='' || Email =='' || Password=='' || RePassword==''){
            $(".footer-sub").find("input").removeClass("oninput").addClass("offinput");
            $("#btnSubmit").attr("disabled", true);
        }else{
            $(".footer-sub").find("input").removeClass("offinput").addClass("oninput")
            $("#btnSubmit").attr("disabled", false);
        }
    })

    // 7.所有输入框验证通过再提交注册
    // $submit.submit(function () {
    //     if (flagUser && flagPwd && flagCpwd && flagEmail && flagAllow) {
            
    //     }
    //     else if(!flagAllow){
    //         $allow.next().next().text("请阅读并勾选同意协议")
    //         return false
    //     }else{
    //         return false
    //     }
    // })
}

export{
    register
}
    