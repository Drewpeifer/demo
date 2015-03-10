var uA = navigator.userAgent,
    body = $('body');

// start QAD browser detection
    if (uA.match(/Firefox\/.*/)) {
        body.addClass('firefox');
    } else if (uA.match(/Mozilla\/.*Fennec.*/)) {
        body.addClass('firefox mobile');
    } else if (uA.match(/Chrome\/.*Mobile.*/)) {
        body.addClass('chrome mobile');
    } else if (uA.match(/Chrome\/.*/)) {
        body.addClass('chrome');
    } else if (uA.match(/.*iPhone.*/)) {
        body.addClass('safari mobile iphone');
    } else if (uA.match(/iPad\/.*/)) {
        body.addClass('safari mobile ipad');
    } else if (uA.match(/Safari\/.*/)) {
        body.addClass('safari');
    } else if (uA.match(/MSIE 9\.0.*/)) {
        body.addClass('ie9');
    } else if (uA.match(/MSIE 8\.0.*/)) {
        body.addClass('ie8');
    } else if (uA.match(/MSIE 7\.0.*/)) {
        body.addClass('ie7');
    } else {
        body.addclass('unknown-useragent');
    }
    console.log('navigator.useragent = ' + uA);
// end browser detection

// rotate body if device rotates
$(window).on("reload, resize",function(){
    if (window.innerHeight > window.innerWidth){
        console.log('portrait ' + event.type);
        console.log(window.innerHeight + " = innerHeight");
        console.log(window.innerWidth + " = innerWidth");
        $('body').css({
            "transform" : "rotate(0deg)",
            "width" : window.innerWidth
        });
    } else {
        console.log('landscape ' + event.type);
        console.log(window.innerHeight + " = innerHeight");
        console.log(window.innerWidth + " = innerWidth");
        $('body').css({
            "transform" : "rotate(90deg)",
            "width" : window.innerHeight
        });
    }
});

//$(document).ready(function() {});