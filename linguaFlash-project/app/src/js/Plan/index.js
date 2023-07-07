import $ from "jquery"

    //对比数字
    function contrast() {
        // console.log(Number($(".today-desc").find("span").text()));
        if (Number($(".today-desc").find("span").text()) >= Number($(".today-text").find("span").text())) {
            $(".today-til").find("i").removeClass("bi-x-circle-fill").addClass("bi-check-circle-fill");
        } else {
            $(".today-til").find("i").removeClass("bi-check-circle-fill").addClass("bi-x-circle-fill");
        }
    }

    //今日已完成给图标数字
    function unified() {
        $(".today-icon").text($(".today-desc").find("span").text());
    }

export{
    contrast,
    unified
}