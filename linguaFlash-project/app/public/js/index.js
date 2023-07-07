$(function () {

    //对比数字
    function contrast() {
        if (Number($(".today-desc").find("span").text()) >= Number($(".today-text").find("span").text())) {
            $(".today-til").find("i").removeClass("bi-x-circle-fill").addClass("bi-check-circle-fill");
        } else {
            $(".today-til").find("i").removeClass("bi-check-circle-fill").addClass("bi-x-circle-fill");
        }
    }

    contrast();

    //今日已完成给图标数字
    function unified() {
        $(".today-icon").text($(".today-desc").find("span").text());
    }

    unified();

    //禁止滚动条滚动
    function unScroll() {
        var top = $(document).scrollTop();

        $(document).on('scroll.unable', function (e) {
            $(document).scrollTop(top);
        })
    }

    //移除禁止滚动条滚动
    function removeUnScroll() {
        $(document).unbind("scroll.unable");

    }

    //显示模态框1
    $(".course-selection").find("a").find(".course-arrow").on("click", function () {
        $("#modai1").fadeIn(50);
        // $("body,html").css("overflow", "hidden");
        unScroll();
    })

    //退出模态框1
    $(".course-modal-window").find("h2").find(".bi-x-lg").on("click", function () {
        $("#modai1").fadeOut("fast");
        // $("body,html").css("overflow", "scroll");
        removeUnScroll();
    })

    //模态框1按钮选中
    $(".course-rights").find(".meta").find("i").on({
        click: function () {
            $(".course-list-item").siblings("div").find(".course-rights").find(".meta").find("i").addClass("bi-circle").removeClass("iselect");
            $(this).removeClass("bi-circle").addClass("bi-check-circle-fill iselect");
            $(".course-list-item").siblings("div").find(".course-rights").find(".meta").find("span").text("");
            $(this).parent(".meta").find("span").text("学习中");

            //模态框1按钮选中替换首页
            $(".course-icon").find("img").prop("src", $(this).parents(".course-rights").siblings(".course-icons").find("img").prop("src"));
            $(".course-info").find(".info-title").text($(this).parents(".course-rights").siblings(".course-infos").find(".title").text());
            $(".course-info").find(".info-subtitle").text($(this).parents(".course-rights").siblings(".course-infos").find(".subtitle").text());
        }
    })

    //显示模态框2
    $(".variation-icon,.variation-name").on("click", function () {
        $("#modai2").fadeIn(50);
        // $("body,html").css("overflow", "hidden");
        unScroll();
    })

    //退出模态框2
    $(".course-modal-window").find(".title").find(".bi-x-lg").on("click", function () {
        $(this).parents(".course-modal").fadeOut("fast");
        //$("#modai2").fadeOut("fast");
        // $("body,html").css("overflow", "scroll");
        removeUnScroll();
    })

    //词卡解析显示
    $(".main-left").find(".card-btn").on("click", function () {
        $(".card-answer").stop().fadeToggle(100);
    })

    //左侧切换
    $(".left-nav").find("ul").find(".left-nav-li").on("click", function () {
        $(this).siblings("li").find("a").removeClass("active");
        $(this).find("a").addClass("active");

        var index = $(this).index();
        $("#right").children("div").eq(index - 1).siblings("div").fadeOut("fast");
        $("#right").children("div").eq(index - 1).fadeIn("fast");

    })

    //开始学习
    $(".cta").find("button").on("click", function () {
        $("#right").children("div").eq(0).fadeOut("fast");
        $("#right").children("div").eq(1).fadeIn("fast");
        $(".left-nav").find("ul").find(".left-nav-li").eq(0).find("a").removeClass("active");
        $(".left-nav").find("ul").find(".left-nav-li").eq(1).find("a").addClass("active");
    })

    //会or不会
    var words = [
        {
            wname: "parry",
            state: 0
        },
        {
            wname: "sophisticated",
            state: 0
        },
        {
            wname: "meant",
            state: 0
        },
        {
            wname: "concept",
            state: 0
        },
        {
            wname: "finish",
            state: 0
        }

    ];

    var arr = [0];
    var nword = words.filter(item => arr.indexOf(item.state) > -1);

    var arry = [1];
    var yword = words.filter(item => arry.indexOf(item.state) > -1)

    //默认第一个单词
    $(".card-word").text(words[0].wname);

    var frequency = 0;
    var text;
    var newfrequency = 0;
    var windex = 0;
    $(".card-footer").find(".yes").on("click", function () {

        if (frequency > nword.length - 1) {
            frequency = 0;
        }
        if (frequency == 0) {
            frequency = 1;
        }
        if (nword.length == 1) {
            alert("恭喜您已完成今日所有任务！");
            $(this).attr("disabled", "true").css("cursor", "not-allowed");
            $(".no").attr("disabled", "true").css("cursor", "not-allowed");
        } else {

            text = $(".card-word").text();
            windex = nword.findIndex(item => item.wname === text);
            $(".card-word").text(nword[frequency].wname);
            // console.log(windex);
            nword.splice(windex, 1);

            // console.log(windex);

        }
        if (frequency == 1) {
            frequency = 0;
        }

        frequency++;
    })

    $(".card-footer").find(".no").on("click", function () {

        windex = nword.findIndex(item => item.wname === text);
        // console.log('=====');
        // console.log(windex);
        if (frequency < words.length - 1) {
            $(".card-word").text(words[frequency + 1].wname);
        }
        if (frequency >= words.length - 1) {
            newfrequency++;
            if (newfrequency > nword.length) {
                newfrequency = 1;
            }
            $(".card-word").text(nword[newfrequency - 1].wname);
        }
        frequency++;

    })

    //星星变色
    $(".card-collect").find("i").on("click",function(){
        if($(this).attr("data-iscollect") == "false"){
            $(this).css("color","#faaa5a");
            $(this).attr("data-iscollect","true");
        }else if($(this).attr("data-iscollect") == "true"){
            $(this).css("color","#eef0f4");
            $(this).attr("data-iscollect","false");
        }
    })

    //input自适应
    $(".card-input").find("input").on("input",function(e){
        
      $("#label-util").text(e.target.value);
        // console.log($(".card-input").find("input").val().length)
    })




    // //RePortrait更换头像
    // $("#RePortrait").on("click",function(){
    //     $(".user-tabs").find("a").siblings().removeClass("user-active");
    //     $(".user-tabs").find("a").eq(1).addClass("user-active");
    //     $(".user-infomation").eq(1).fadeIn(200).siblings(".user-infomation").fadeOut(100);
    // })

    //性别判断
    var gender = $(".info-bod").find("#xingbie").text();
    if (gender == "女") {
        $("#gender").find("i").removeClass("bi-gender-male").addClass("bi-gender-female");
    }

    //帐户tab设置
    $(".user-tabs").find("a").on("click", function () {
        $(this).siblings().removeClass("user-active");
        $(this).addClass("user-active");
        $(".user-infomation").eq($(this).index()).fadeIn(200).siblings(".user-infomation").fadeOut(100);
        if ($(this).index() == 0) {
            $(".user-info-sub").hide();
            $(".user-button").show();
            $(".user-main").css("height", "510px");
        } else if ($(this).index() == 1) {

            if ($(".password-arrow").find("i").hasClass("bi-caret-down-fill")) {

                $(".user-main").css("height", "650px");
            }
            $(".user-button").hide();
            $(".user-info-sub").show();
        }

    })

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
    
    var flagOldPassword = false;
    var flagNewPassword = false;
    $(".old").on("blur", function () {
        if ($(".old").val() != myPassword) {
            $(".tips").removeClass("bi-check-lg").addClass("bi-exclamation-lg");
            flagOldPassword = false;
        } else {
            $(".tips").removeClass("bi-exclamation-lg").addClass("bi-check-lg");
            flagOldPassword = true;
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
        var confirmPass = /^[a-zA-Z0-9_]{6,16}$/;
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
            $(".password-btn").find("span").html("新密码格式不正确<br/>(6~16位包含数字、大小写字母、下划线)");
            flagNewPassword = false;
        }


    })

    $(".password-save").on("mouseover", function () {
        if (flagOldPassword && flagNewPassword) {
            $(".password-save").css("cursor", "pointer");
        } else {
            $(".password-save").css("cursor", "not-allowed");
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

    //图标变色小细节
    $(".edit-input").on("focus blur", function () {
        $(this).siblings("i").toggleClass("active-icon");
    })
    $(".gender-radio").on("change", function () {
        $(this).prev("span").prev("i").removeClass("edit-gender");
        $(this).siblings("input").prev("span").prev("i").addClass("edit-gender");
    })


    $(".course-list-item").not("#noone").find(".course-rights").find(".meta").find("i").on("click", function () {
        // $("#course-modal").val("1");
        // console.log($("#course-modal").val());
        // console.log($(".course-list-item").not("#noone").index());
        $("#course-modal").val($(this).attr("data-id"));
        console.log($("#course-modal").val());
        // console.log($(this).attr("data-id"));
    })

    $("li[data-li=1]").on("click", function () {
        $("#modai2").fadeIn(50);
    })

    $("li[data-li=2]").on("click", function () {
        $("#modai3").fadeIn(50);
    })

    //计算已激活课程的数量，并赋值给count
    $(".count").text($(".list").children("li").length);

    //判断已激活课程的语言
    // var language=$(".category").find("span").text();
    // console.log(language);
    // if(language=="1"){
    //     $(".category").find("span").text("英语");
    // }else if(language=="2"){
    //     $(".category").find("span").text("美語");
    // }
        
    //判断用户选择的外语语言
    var foreign = $(".language").text();
    if(foreign=="1"){
        $(".language").text("英语");
    }else if (foreign=="2"){
        $(".language").text("美語");
    }

    //修改信息时得到焦点文本内容选中
    $(".edit-input").on("focus",function(){
        $(this).select();
    })
    
//#region  
    
    //验证昵称
    var modifyNickname=false;
    var confirmNickname = /^\S{1,12}$/;
    $("#nickname").on("blur", function () {
         var nicknameVal = $.trim($(this).val());
       if(confirmNickname.test(nicknameVal) == false){
            $(this).next().show();
            $(this).parent().next().text("昵称格式不正确（不包含空格的1~12位任意字符）")
            modifyNickname=false;
       }else{
            $(this).next().hide();
            $(this).parent().next().text("")
            modifyNickname=true;
       }
     })

    var modifyEmail=false;
    var confirmEmail = /^([a-zA-Z0-9_.-]+)@([da-z.-]+).([a-z.]{2,6})$/;
    //验证邮箱
     $("#email").on("blur", function () {
         var emailVal = $.trim($(this).val());
       if(confirmEmail.test(emailVal) == false){
            $(this).next().show();
            $(this).parent().next().text("邮箱格式不正确")
            modifyEmail=false;
       }else{
            $(this).next().hide();
            $(this).parent().next().text("")
            modifyEmail=true;
       }
         
     })

     $("#modify-info").submit(function(){
         if(modifyEmail==false || modifyNickname==false){
             alert("修改信息失败，请检查输入格式")
             return false
         }else{
             alert("修改信息成功")
         }
     })
//#endregion
         
    //word list toggle
    $(".wordList-nav").find("ul").find("li").find("a").on("click",function(){
        $(this).parent().siblings().find("a").removeClass("wordList-navAction");
        $(this).addClass("wordList-navAction");
        $(".wordList-content").eq($(this).parent().index()).siblings(".wordList-content").fadeOut(100)
        $(".wordList-content").eq($(this).parent().index()).fadeIn(100)
        if($(this).parent().index() == 0){
            $(".left-nav").find("ul").find("li").eq(6).siblings("li").find("a").removeClass("active");
            $(".left-nav").find("ul").find("li").eq(6).find("a").addClass("active");
        }else if($(this).parent().index() == 1){
            $(".left-nav").find("ul").find("li").eq(7).siblings("li").find("a").removeClass("active");
            $(".left-nav").find("ul").find("li").eq(7).find("a").addClass("active");
        }
    }) 

    //word list 单词下拉
    $(".wordItem-tran").find("i").on("click",function(){
        if($(this).hasClass("bi-chevron-down")){
            $(this).removeClass("bi-chevron-down").addClass("bi-chevron-up")
            $(this).parent().siblings(".wordItem-details").slideDown(250)
        }else if($(this).hasClass("bi-chevron-up")){
            $(this).removeClass("bi-chevron-up").addClass("bi-chevron-down")
            $(this).parent().siblings(".wordItem-details").slideUp(250)
        }
    })

    //重难点单词 toggle
    $(".left-nav").find("ul").find("li").eq(6).on("click",function(){
        $(".wordList-nav").find("ul").find("li").eq(0).find("a").click()
    })

    //已学会的单词 toggle
    $(".left-nav").find("ul").find("li").eq(7).on("click",function(){
        $("#right").children("div").eq(5).siblings("div").fadeOut("fast");
        $("#right").children("div").eq(5).fadeIn("fast");
        $(".wordList-nav").find("ul").find("li").eq(1).find("a").click()
    })
})


//截取空格
let shape = $(".card-cixing").text()
let notes = $(".card-notes").html()
var reg = new RegExp(",","g");//g,表示全部替换。

$(".card-cixing").html(shape.replace(reg,"&nbsp;&nbsp;&nbsp;"));
$(".card-notes").html(notes.replace(reg,"<br/>"))

