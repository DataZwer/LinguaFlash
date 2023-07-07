import $ from "jquery"

function star(){
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
}

function input(){
    //input自适应
    $(".card-input").find("input").on("input",function(e){
        
      $("#label-util").text(e.target.value);
        // console.log($(".card-input").find("input").val().length)
    })
}

function trim(){
    //截取空格
    let shape = $(".card-cixing").text()
    let notes = $(".card-notes").html()
    if(shape && notes){
        var reg = new RegExp(",", "g");//g,表示全部替换。
        // console.log(shape);
        // console.log(notes);
        $(".card-cixing").html(shape.replace(reg, "&nbsp;&nbsp;&nbsp;"));
        $(".card-notes").html(notes.replace(reg, "<br/>"))

    }

}

export{
    star,
    input,
    trim
}