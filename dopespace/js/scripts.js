var config = {
    turn : 0,
    startingFuel : 10,
    startingPort : map[0],
    startingLoot : 0,
    startingCap : 20
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

function welcomeAlert() {

    welcomeTitle = "SpaceTrade";
    welcomeDescrip = "It's the year 3021 and planets are now boring, but space is still the " +
                     "coolest. That's why you sold everything you own and love, including " +
                     "your family, to buy this awesome new starship. It goes super fast, " +
                     "comes with a crew already inside it, trained and everything, plus " +
                     "a sweet sound system.";

    showAlert(welcomeTitle, welcomeDescrip);
    $('.alert-content span').append("<p class='alert-description'>You're still on Earth but you're ready to blast off. Feel free to peruse the marketplace on Earth, or just hit the Big Red Button to pick your next destination.</p>")
                       .append("<p class='alert-description'>Careful though. Space is big and weird. So are the things that live in it. It can also make people go crazy just from being in it. Space, that is. Because it's big and weird. Just be careful.</p>")
                       .append("<div id='close' class='button alert-action'><p>AWESOME!</p></div>");
    $('#close').on('click', function() {
        $('.alert').fadeOut(500);
    });
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
    cargo = $('span.cargo');// cargo container (ha)
    cargoLoot = $('.cargo p.loot');
    cargoCap = $('.cargo p.cap');

    fuelTank.text(config.startingFuel);// set initial fuel
    portTitle.text(config.startingPort.title);// set initial port title
    portDescription.text(config.startingPort.description);// set initial port descrip
    cargoLoot.text(config.startingLoot);
    cargoCap.text(config.startingCap);
    stockMarket();// build initial marketplace
    $('.buy, .sell').click(buySell);// rebind after market build

    evalLootStockCargo();
    welcomeAlert();

});