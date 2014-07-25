var uA = navigator.userAgent,
    body = $('div.body'),
    card = $('#card'),
    mobileWarning = '<p class="mobile">Turn your device sideways for the best experience</p>';

// start QAD browser detection
    if (uA.match(/Firefox\/.*/)) {
        body.addClass('firefox');
    } else if (uA.match(/Mozilla\/.*Fennec.*/)) {
        body.addClass('firefox mobile');
    } else if (uA.match(/Chrome\/.*/)) {
        body.addClass('chrome');
    } else if (uA.match(/Chrome\/.*Mobile.*/)) {
        body.addClass('chrome mobile');
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
    }
    console.log('navigator.useragent = ' + uA);
// end browser detection

// mobile layout rendering
function showWarning() {
    $('p.mobile').show();
}
function hideWarning() {
    $('p.mobile').delay(2000).slideUp(1000);
}

// if overlay is open on rotate, disable ridiculous auto-zoom on iOS
if (body.hasClass('mobile')) {
    var viewportmeta = document.querySelector('meta[name="viewport"]');
    if (viewportmeta) {
        viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0';
        document.body.addEventListener('gesturestart', function () {
            viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6';
        }, false);
    }
}

    if (body.hasClass('mobile') && $(window).width()<400) { // if mobile & portrait
        console.log('uh oh its mobile'),
        body.prepend(mobileWarning),
        showWarning(); // show warning
    } else {
        // do nothing
    }

$(document).ready(function() {

    hideWarning();
});