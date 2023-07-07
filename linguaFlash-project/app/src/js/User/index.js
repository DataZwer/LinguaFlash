import $ from "jquery"

function setPassword() {

    //eye
    var openEye = false;
    $(".password-before").find(".distin").on("click", function () {
        if (openEye == false) {
            $(this).removeClass("bi-eye-slash").addClass("bi-eye");
            $(this).siblings("input").prop("type", "text");
            openEye = true;
        } else {
            $(this).removeClass("bi-eye").addClass("bi-eye-slash");
            $(this).siblings("input").prop("type", "password");
            openEye = false;
        }
    })

    //password验证
    var OldPasswords = /^[\w!-@#$%^&*]{6,16}$/;
    var flagOldPassword = false;
    var flagNewPassword = false;
    $(".old").on("blur", function () {
        let oldval = $(".old").val()
        if (OldPasswords.test(oldval)) {
            $(".tips").removeClass("bi-exclamation-lg").addClass("bi-check-lg");
            flagOldPassword = true;
            $(".password-btn").find("span").html("");
        } else {
            $(".tips").removeClass("bi-check-lg").addClass("bi-exclamation-lg");
            flagOldPassword = false;
            $(".password-btn").find("span").html("旧密码格式不正确<br/>(6~16位包含数字、大小写字母、下划线等)");
        }

    })

    $(".new").on("click", function () {
        var oldvals = $(".old").val();
        if (oldvals == "") {
            $(".password-btn").find("span").html("请先输入旧密码");
            $(".old").focus();

        } else {
            $(".password-btn").find("span").html("");
        }
    })

    $(".new").on("blur", function () {
        var newvals = $(".new").val();
        var oldvals = $(".old").val();

        // 密码正则匹配表达式
        var confirmPass = /^[\w!-@#$%^&*]{6,16}$/;
        // 如果输入框为空，return

        if (newvals == '') {

            $(".tipstow").removeClass("bi-check-lg").addClass("bi-exclamation-lg");
            flagNewPassword = false;
            return;
        }
        // 正则验证密码输入是否合法
        if (confirmPass.test(newvals) && newvals != oldvals) {

            $(".password-btn").find("span").html("");
            $(".tipstow").removeClass("bi-exclamation-lg").addClass("bi-check-lg");
            flagNewPassword = true;
        }
        else if (newvals == oldvals) {
            $(".password-btn").find("span").html("新密码不能与旧密码相同");
            $(".tipstow").removeClass("bi-check-lg").addClass("bi-exclamation-lg");
            flagNewPassword = false;
        } else if (confirmPass.test(newvals) == false) {

            $(".tipstow").removeClass("bi-check-lg").addClass("bi-exclamation-lg");
            $(".password-btn").find("span").html("新密码格式不正确<br/>(6~16位包含数字、大小写字母、下划线等)");
            flagNewPassword = false;
        }


    })

    $(".password-save").on("mouseover", function () {
        if (flagOldPassword && flagNewPassword) {
            $(".password-save").css("cursor", "pointer");
            $(".password-save").css("opacity", "1");
        } else {
            $(".password-save").css("cursor", "not-allowed");
            $(".password-save").css("opacity", "0.5");
            
        }
    })

    $("#password-form").submit(function () {
        if (flagOldPassword && flagNewPassword) {
            alert("修改密码成功");
        }
        else if (flagOldPassword == false) {

            $(".tips").removeClass("bi-check-lg").addClass("bi-exclamation-lg");
            return false;
        } else if (flagNewPassword == false) {

            $(".tipstow").removeClass("bi-check-lg").addClass("bi-exclamation-lg");
            return false;
        } else if (flagNewPassword == false && flagOldPassword == false) {

            $(".tips").removeClass("bi-check-lg").addClass("bi-exclamation-lg");
            $(".tipstow").removeClass("bi-check-lg").addClass("bi-exclamation-lg");
            return false;
        }
    })
}

function details() {


    //图标变色小细节
    $(".edit-input").on("focus blur", function () {
        $(this).siblings("i").toggleClass("active-icon");
    })
    $(".gender-radio").on("change", function () {
        $(this).prev("span").prev("i").removeClass("edit-gender");
        $(this).siblings("input").prev("span").prev("i").addClass("edit-gender");
    })
    // console.log($(".gender-radio[name=gender]:checked").val());
    // if ($(".gender-radio").prop("checked") == true) {
    //     $("#man").prev("span").prev("i").removeClass("edit-gender");
    //     $("#man").siblings("input").prev("span").prev("i").addClass("edit-gender");

    // } else if ($(".gender-radio").prop("checked") == false) {
    //     $("#woman").prev("span").prev("i").removeClass("edit-gender");
    //     $("#woman").siblings("input").prev("span").prev("i").addClass("edit-gender");
    // }


    //修改信息时得到焦点文本内容选中
    $(".edit-input").on("focus", function () {
        $(this).select();
    })
}

function setInfo() {
    //验证昵称
    var modifyNickname = true;
    var confirmNickname = /^\S{1,12}$/;
    $("#nickname").on("blur", function () {
        var nicknameVal = $.trim($(this).val());
        if (confirmNickname.test(nicknameVal) == false) {
            $(this).next().show();
            $(this).parent().next().text("昵称格式不正确（不包含空格的1~12位任意字符）")
            modifyNickname = false;
        } else {
            $(this).next().hide();
            $(this).parent().next().text("")
            modifyNickname = true;
        }
    })

    var modifyEmail = true;
    var confirmEmail = /^([a-zA-Z0-9_.-]+)@([da-z.-]+).([a-z.]{2,6})$/;
    //验证邮箱
    $("#email").on("blur", function () {
        var emailVal = $.trim($(this).val());
        if (confirmEmail.test(emailVal) == false) {
            $(this).next().show();
            $(this).parent().next().text("邮箱格式不正确")
            modifyEmail = false;
        } else {
            $(this).next().hide();
            $(this).parent().next().text("")
            modifyEmail = true;
        }

    })

    // $("#modify-info").submit(function () {
    //     if (modifyEmail == false || modifyNickname == false) {
    //         alert("修改信息失败，请检查输入格式")
    //         return false
    //     } else {
    //         alert("修改信息成功")
    //     }
    // })

    $(".user-info-sub").on("mouseover",function(){
        if (modifyEmail == false || modifyNickname == false){
            $(this).css("cursor","not-allowed")
        }else{
            $(this).css("cursor","pointer")
        }
    })
}

function dropDown() {
    //设置密码
    $(".password").on("click", function () {
        if ($(".password-arrow").find("i").hasClass("bi-caret-right-fill")) {

            $(".password-arrow").find("i").removeClass("bi-caret-right-fill").addClass("bi-caret-down-fill");
            $(".password-creator").stop().slideDown("fast");
            $(".user-main").css("height", "650px");
        }
        else if ($(".password-arrow").find("i").hasClass("bi-caret-down-fill")) {

            $(".password-arrow").find("i").removeClass("bi-caret-down-fill").addClass("bi-caret-right-fill");
            $(".password-creator").stop().slideUp("fast");
            $(".user-main").css("height", "510px");
        }
    })
}

export {
    setPassword,
    details,
    setInfo,
    dropDown
}