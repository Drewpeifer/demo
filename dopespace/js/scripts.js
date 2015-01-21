// populate map, will be dynamically chosen later
function buildMap() {
    // build map
    map.forEach( function (location) {
        $('.map ul').append(
            '<li><a href="#" id="' +
            location.title +
            '">' +
            location.title.toUpperCase() +
            '</a></li>');
    });
}

// onLoad
//////////
$(function() {

    buildMap();
    stockMarket();
    evalLootStock();
    $('div').css({"width":"275px"});

    // bindings
    $('button#map').click(function() {
        $('.map').slideDown();
    });
    $('.map .close').click(function() {
        $('.map').slideUp();
    });
    $('.map ul li a').click(travel);
    $('.buy, .sell').click(buySell);

    // TODO: find better way to do first travel
    $('#Earth').click();
});