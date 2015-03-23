var config = {
    turn : 0,// starts game progression at turn 0
    startingWallet : 3000,// starting cash
    startingFuel : 10,//starting fuel amount
    startingPort : mapA[0],// starting location
    startingLoot : 0,// set loot to 0
    startingCap : 20,// starting cargo capactiy
    cargoUpgrades : 3,// available upgrades (total)
    currentEvent : function() {// returns current incident, if one is firing
            incident = incidents.filter(function( obj ) {
              return obj.isHappening == true;
            });
            return incident[0];
    }
}

// return random number from min (inclusive) to max (inclusive, because we round)
function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
// custom alert message
function showAlert(title, description) {
    alert = $('.alert'),
    alertContent = $('.alert .alert-content');

    alertContent.empty();
    alertContent.append('<span><p class="alert-title"></p>' +
                 '<p class="alert-description">' +
                 '</p>' +
                 '</span>');

    alertTitle = $('.alert span .alert-title'),
    alertDescrip = $('.alert span .alert-description');

    alertTitle.text(title);
    alertDescrip.text(description);

    $('.header, .market, .stats').css({
        "opacity":.3
    });
    alert.show();

}
function closeAlert() {
    $('.peripheral').fadeOut(500);
    $('.header, .market, .stats').css({
        "opacity":1
    });
}
function showMap() {
    $('.map').slideDown();
    $('.header, .market, .stats').css({
        "opacity":.3
    });
}

// populate map, will be dynamically chosen later
function buildMap() {
    // build map
    $('.map').append('<ul><li><b>Map locations:</b></li></ul>');
    mapA.forEach( function (location) {
        $('.map ul').append('<li><a href="#" id="' +
                location.title +
                '"><span class="icon"></span>' +
                location.title.toUpperCase() +
                '</a></li>');
    });
    $('.map').append('<div id="close-map" class="button alert-action" onclick="closeAlert();">' +
            '<p>Close Map</p></div>');
}

function welcomeAlert() {

    welcomeTitle = "SpaceTrade";
    welcomeDescrip = "It's the year 3021 and planets are now boring, but space is still the " +
                     "coolest. That's why you sold everything you own and love, including " +
                     "your family, to buy this awesome new starship. It goes super fast, " +
                     "comes with a crew already inside it, trained and everything, plus " +
                     "a sweet sound system.";

    showAlert(welcomeTitle, welcomeDescrip);
    $('.alert .alert-content span').append("<p class='alert-description'>You're still on Earth but you're ready to blast off. Feel free to peruse the marketplace on Earth, or just hit the Big Red Button to pick your next destination.</p>")
                       .append("<p class='alert-description'>The objective is to buy low, sell high, and never stop flying. If we run out of cash, gas, or both, we're cooked. Also, if we hit a star, we're cooked. Or if someone hits us with a microwave gun... you get the idea. It's dangerous out here.</p>")
                       .append("<div id='close' class='button alert-action' onclick='closeAlert();'><p>AWESOME!</p></div>");
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
                       .append("<div id='close' class='button alert-action game-over' onclick='location.reload();'><p>LEMME PLAY AGAIN!</p></div>");
}

// onLoad
//////////
$(function() {

    buildMap();
    // bindings
    $('.map-control').click(showMap);
    $('.map ul li a').click(travel);
    $('.alert .close').click(closeAlert);

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