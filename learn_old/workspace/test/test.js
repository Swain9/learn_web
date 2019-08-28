$(function(){
    $(".weui-tabbar__item").on("click", function () {
        //.sibiling选择兄弟节点的时候没有加上.Class选择器
        $(this).addClass("weui-bar__item_on").siblings(".weui-bar__item_on").removeClass("weui-bar__item_on");
    });
});