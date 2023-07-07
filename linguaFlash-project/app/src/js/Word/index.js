import $ from "jquery"

function wordlist(){

    // console.log("123123123");
    //word list 单词下拉
    $(".wordItem-tran").find("i").on("click", function () {
        // console.log(123);
        if ($(this).hasClass("bi-chevron-down")) {
            $(this).removeClass("bi-chevron-down").addClass("bi-chevron-up")
            $(this).parent().siblings(".wordItem-details").slideDown(250)
        } else if ($(this).hasClass("bi-chevron-up")) {
            $(this).removeClass("bi-chevron-up").addClass("bi-chevron-down")
            $(this).parent().siblings(".wordItem-details").slideUp(250)
        }
    })
}

export{
    wordlist
}