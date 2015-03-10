var config = {
    turn : 0,
    startingWallet : 3000,
    startingFuel : 10,
    startingPort : map[0],
    startingLoot : 0,
    startingCap : 20,
    cargoUpgrades : 3
}

// return random number from min (inclusive) to max (exclusive)
function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
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

function gameOverAlert() {
    walletVal = parseInt($('.wallet p').text()),// current money
    turns = config.turn,// current number of turns taken
    totalLootValue = 0;

    // here we loop through the menu, find any items that you own,
    // find out how many you own, multiply that by the current port's price
    // for that item, and then store that value in ownedLootVals. The sum of that
    // array is the current market value of your remaining stock,
    // if you wished to sell it
    menu.forEach(function(stock){
        if(stock.loot != 0) {// do you own any?
            lootAmount = stock.loot;// how many do you own?
            // find the dom row of that loot, and the current price
            lootPrice = parseInt($('.market td:contains("' + stock.title + '")').siblings('.price').children('p').text());
            lootValue = lootAmount * lootPrice;// find out how much it's worth
            console.log("you own " + lootAmount + " of " + stock.title + " selling for " + lootPrice);
            totalLootValue += lootValue;// add it to the totalLootValue
        }
    });

    numOfUpgrades = ((parseInt($('.cargo .cap').text()) / 20) - 1);
    console.log("all your goods are worth " + totalLootValue + " and you've upgraded " + numOfUpgrades + " times.");
    // calculate final score
    finalScore = (turns + numOfUpgrades) * (walletVal + totalLootValue);

    endTitle = "Game Over, Man!";
    endDescrip = "This sucks, Captain! We're out of fuel, and this isn't a fuel port! " +
                 "Guess we'll have to set up shop here and open a space store-- " +
                 "wait, that's pretty cool actually. Can I be the greeter?";

    showAlert(endTitle, endDescrip);
    $('.alert-content span').append("<p class='alert-description game-over'>Remaining Cash : &nbsp;" + walletVal + "</p>")
                       .append("<p class='alert-description game-over'>Value of Remaining Loot : &nbsp;" + totalLootValue + "</p>")
                       .append("<p class='alert-description game-over'>Turns Taken : &nbsp;" + turns + "</p>")
                       .append("<p class='alert-title'>Final Score : &nbsp;" + finalScore + "</p>")
                       .append("<div id='close' class='button alert-action game-over'><p>LEMME PLAY AGAIN!</p></div>");
    $('#close').on('click', function() {
        location.reload();// refresh page, start game over
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
    cargoLoot = $('.cargo p.loot');// user's starting goods (0 default)
    cargoCap = $('.cargo p.cap');// inventory cap (20 default)
    wallet = $('.wallet p');// user money (3000 default)

    fuelTank.text(config.startingFuel);// set initial fuel
    portTitle.text(config.startingPort.title);// set initial port title
    portDescription.text(config.startingPort.description);// set initial port descrip
    cargoLoot.text(config.startingLoot);// set starting user cargo
    cargoCap.text(config.startingCap);// set starting cargo cap
    wallet.text(config.startingWallet);// set starting user money
    stockMarket();// build initial marketplace
    $('.buy, .sell').click(buySell);// rebind after market build
    $('.fuel-station .buy').unbind()// TODO: this seems hacky
                           .click(buyFuel);// but i like semantics
    // cargo upgrade stations
    $('.cargo-upgrade .buy').unbind()
                           .click(upgradeCargo);

    evalLootStockCargo();
    makeManyStars(); // build the first new stars
    welcomeAlert();// show welcome splash

});