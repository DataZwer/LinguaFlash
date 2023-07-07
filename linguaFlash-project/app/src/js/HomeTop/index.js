import $ from "jquery"
function userinfo(){

 $("#user-intro").on("click",function(){
        if ($(this).find("i").hasClass("bi-caret-right-fill")) {
            $(this).find("i").removeClass("bi-caret-right-fill").addClass("bi-caret-down-fill");
            $(".dropdown-menu").stop().fadeIn(240);
        }
        else if ($(this).find("i").hasClass("bi-caret-down-fill")) {
            $(this).find("i").removeClass("bi-caret-down-fill").addClass("bi-caret-right-fill");
            $(".dropdown-menu").stop().fadeOut(240);
        }
    })

}

export{
    userinfo
}