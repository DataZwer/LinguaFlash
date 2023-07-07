import $ from "jquery"
function login(){

    //button
    $("#btnSubmit").attr("disabled", true);

    // const buttonValue = $(".login-input").val();
    $(".login-input").bind('input propertychange', function(){
        const usernameValue = $.trim($("#username").val());
        const passwordValue = $.trim($("#password").val());
        if(usernameValue=='' || passwordValue ==''){
            $(".footer-sub").find("input").removeClass("oninput").addClass("offinput");
            $("#btnSubmit").attr("disabled", true);
        }else{
            $(".footer-sub").find("input").removeClass("offinput").addClass("oninput")
            $("#btnSubmit").attr("disabled", false);
        }
    })
}

export{
    login
}
