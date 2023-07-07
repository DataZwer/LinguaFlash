import $ from "jquery"


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

    function buttoncheck(){

        //模态框1按钮选中
        $(".course-rights").find(".meta").find("i").on({
            click: function () {
                $(".course-list-item").siblings("div").find(".course-rights").find(".meta").find("i").addClass("bi-circle").removeClass("iselect");
                $(this).removeClass("bi-circle").addClass("bi-check-circle-fill iselect");
                $(".course-list-item").siblings("div").find(".course-rights").find(".meta").find("span").text("");
                $(this).parent(".meta").find("span").text("学习中");

                //模态框1按钮选中替换首页
                // $(".course-icon").find("img").prop("src", $(this).parents(".course-rights").siblings(".course-icons").find("img").prop("src"));
                // $(".course-info").find(".info-title").text($(this).parents(".course-rights").siblings(".course-infos").find(".title").text());
                // $(".course-info").find(".info-subtitle").text($(this).parents(".course-rights").siblings(".course-infos").find(".subtitle").text());
            }
        })

    }
    

    
export{
    unScroll,
    removeUnScroll,
    buttoncheck,
}

