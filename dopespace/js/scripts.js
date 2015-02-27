var config = {
    turn : 0,
    startingFuel : 10,
    startingPort : map[0]
}

// return random number from min (inclusive) to max (exclusive)
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

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

// custom alert message
function showAlert(title, description) {
    alert = $('.alert'),
    alertContent = $('.alert-content');

    alertContent.empty();
    alertContent.append('<span><p class="alert-title"></p>' +
                 '<p class="alert-description">' +
                 '</p>' +
                 '</span>');

    alertTitle = $('.alert-title'),
    alertDescrip = $('.alert-description');

    alertTitle.text(title);
    alertDescrip.text(description);
    alert.show();

}
// onLoad
//////////
$(function() {

    buildMap();
    // bindings
    $('.map-control').click(function() {
        $('.map').slideDown();
    });
    $('.map .close').click(function() {
        $('.map').slideUp();
    });
    $('.map ul li a').click(travel);
    $('.alert .close').click(function() {
        $('.alert').fadeOut(500);
    });

    // Set initial variables (port, fuel, etc)
    portTitle = $('.location p'),// port label container
    portDescription = $('.header .dialog p'),// port description container
    fuelTank = $('.fuel p');// fuel label container

    fuelTank.text(config.startingFuel);// set initial fuel
    portTitle.text(config.startingPort.title);// set initial port title
    portDescription.text(config.startingPort.description);// set initial port descrip
    stockMarket();// build initial marketplace

    evalLootStockCargo();

});