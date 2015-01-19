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

// buying and selling
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
    fuelTank = $('.fuel p'),// fuel label container
    fuel = parseInt(fuelTank.text()),// current fuel value
    portTitle = $('.location p'),// port label container
    portDescription = $('.stats .dialog p'),// port description container
    nextPort = $(this).attr('id'),// clicked location
    port = map.filter(function (location) {
        // find the corresponsing JS map location obj
        return location.title == nextPort;});

    console.dir(port);

    if (fuel == 0) {
        alert('out of fuel, you\'re stuck!');
    } else if (portTitle.text() === nextPort) {
        alert('already there');
    } else {
        newFuel = fuel -= 1;// subtract fuel
        fuelTank.text(newFuel);// set new fuel
        portTitle.text(port[0].title);// set new currentPort
        portDescription.text(port[0].description);// set new descrip


        $('.map').slideUp();// hide map

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
            location.title +
            '">' +
            location.title.toUpperCase() +
            '</a></li>');
    });
}

// build marketplace for initial port
function stockMarket() {
    menu.forEach( function (stock) {
        $('.market table').append('<tr>' +
                '<td class="item">' +
                stock.title +
                '</td><td class="price">&#36;<p>' +
                stock.basePrice +
                '</p>/lb</td>' +
                '<td class="buy">Buy<br />>></td>' +
                '<td class="stock">' +
                stock.baseStock +
                '</td><td class="loot">0</td>' +
                '<td class="sell">Sell<br /><<</td>' +
            '</tr>');
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