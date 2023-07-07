import $ from "jquery"
function common(){


//eye
    var openEye = false;
    $(".eye").on("click", function () {
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

//focus() border-bottom color  
    $(".login-input").on("focus", function(){
       $(this).parent().css("border-bottom","#2c3143 1px solid")
    })
    $(".login-input").on("blur", function(){
       $(this).parent().css("border-bottom","#b2b8cb 1px solid")
    })

//radio #2c3143
    $(".login-radio").find("input").on("click",function(){
        if($(this).prop("checked")){
            $(this).next().css("color","#2c3143")
        }else{
            $(this).next().css("color","#9698a1")
        }
    }) 

}

export{
    common
}