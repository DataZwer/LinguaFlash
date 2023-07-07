import $ from "jquery"
function leftSlide(){

    var flag = false;
    $(".left-nav").find("ul").find("li").eq(0).on("click", function () {
        if (flag == false) {
            $(".left-nav").css("width", "247px");
            $(".left-nav").find("ul").find("li:last").find("a").find("i").removeClass("bi-arrow-right-short").addClass("bi-arrow-left-short");
            flag = true;
        } else {
            $(".left-nav").css("width", "65px");
            $(".left-nav").find("ul").find("li:last").find("a").find("i").removeClass("bi-arrow-left-short").addClass("bi-arrow-right-short");
            flag = false;
        }

    })

    $(".left-nav").find("ul").find("li:last").on("click", function () {
        if (flag == false) {
            $(".left-nav").css("width", "247px");
            $(this).find("a").find("i").removeClass("bi-arrow-right-short").addClass("bi-arrow-left-short");
            flag = true;
        } else {
            $(".left-nav").css("width", "65px");
            $(this).find("a").find("i").removeClass("bi-arrow-left-short").addClass("bi-arrow-right-short");
            flag = false;
        }

    })

}

function NavSwitch(){
    //左侧切换
    $(".left-nav").find("ul").find(".left-nav-li").on("click", function () {
        $(this).siblings("li").find("a").removeClass("active");
        $(this).find("a").addClass("active");

        var index = $(this).index();
        $("#right").children("div").eq(index - 1).siblings("div").fadeOut("fast");
        $("#right").children("div").eq(index - 1).fadeIn("fast");

    })
}

export{
    leftSlide,
    NavSwitch
}