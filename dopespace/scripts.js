var currentPort = $('.location p').text(),
    fuelTank = $('.fuel p'),
    fuel = fuelTank.text();

// check each stock and loot amount,
// if any equal zero, disable the
// corresponding buy/sell button
function evalLootStock() {
    // TODO: only run this onLoad and
    // other crucial times, build smaller
    // function for buy/sell that just
    // checks sibling loot and stock instead of all
    $('.loot').each(function() {
        lootQ = $(this).text();

        if (lootQ == 0) {
            $(this).addClass('empty');
        } else {
            $(this).removeClass('empty');
        }
    });
    $('.stock').each(function() {
        stockQ = $(this).text();

        if (stockQ == 0) {
            $(this).addClass('empty');
        } else {
            $(this).removeClass('empty');
        }

    });
}

function buySell() {
    var $this = $(this),// buy/sell button
        stock = $this.siblings('.stock'),
        stockVal = stock.text(),// merchant item quantity
        loot = $this.siblings('.loot'),
        lootVal = loot.text(),// user's item quantity
        price = $this.siblings('.price').children('p'),
        priceVal = parseInt(price.text()),// price of item per unit
        wallet = $('.wallet p'),
        walletVal = parseInt(wallet.text());// user's current money

    if ($this.hasClass('buy')) {
        // making a purchase
        newStock = parseInt(stockVal) - 1,// subtract from merchant's stock
        newLoot = parseInt(lootVal) + 1,// add one to your loot
        newWallet = walletVal - priceVal;// subtract unit price from wallet

        if (stockVal == 0) {
            // purchase denied, no stock to buy
            alert('no stock to buy');
        } else if (newWallet < 0) {
            //purchase  denied, not enough money
            alert('aint got enough moneys');
        } else {
            // purchase approved
            stock.text(newStock);// set new stock
            loot.text(newLoot);// set new loot
            wallet.text(newWallet);// set new wallet
            evalLootStock();// check if merchant is out of stock after purchase
        }

    } else if ($this.hasClass('sell')) {
        // making a sale

        if (lootVal == 0) {
            // sale denied
            alert('no loot to sell')
        } else {
            // sale approved
            newStock = parseInt(stockVal) + 1;// add to stock 
            newLoot = parseInt(lootVal) - 1;// subtract from loot
            newWallet = walletVal + priceVal;// add unit price to wallet

            stock.text(newStock);// set new stock
            loot.text(newLoot);// set new loot
            wallet.text(newWallet);// set new wallet

            evalLootStock();// check if loot is empty
        }

    } else {
        // do nothing
    }
}

// travelling between locations
function travel() {
    currentPort = $('.location p'),
    nextPort = $(this).attr('id');

    if (fuel == 0) {
        alert('out of fuel, you\'re stuck!');
    } else if (currentPort.text() === nextPort) {
        alert('already there');
    } else {
        currentPort.text(nextPort);// set new currentPort

        newFuel = fuel -= 1;// subtract fuel
        fuelTank.text(newFuel);// set new fuel

        if (newFuel == 1) {// warn pilot if 1 gallon of fuel left
            alert('almost out of fuel, next trip is the last stop!');
        } else {}

        evalLootStock();// check new location's stock levels
    }
}

// populate map, will be dynamically chosen later
function buildMap() {
    // build map
    map.forEach( function (location) {

        $('.map ul').append(
            '<li><a href="#" id="' +
            location + 
            '">' +
            location.toUpperCase() +
            '</a></li>');

    });
}
// enable/disable/populate stock
// for current port
function stockMarket() {

}

// objects
var map = [ "Earth",
            "Rilos",
            "Xartha",
            "Arrakis" ];

var menu = [];

//map[0] = { "description" : "hooba",
//           "fuelStation" : true,
//           "embargo" : "stockname" };

// onLoad
$(function() {

    evalLootStock();
    buildMap();

    // bindings
    $('.map ul li a').click(travel);
    $('.buy, .sell').click(buySell);

});