var currentPort = $('.location p').text(),
    fuelTank = $('.fuel p'),
    fuel = fuelTank.text();

// check each stock and loot amount,
// if any equal zero, disable the
// corresponding buy/sell button
function evalStock() {
    $('.stock').each(function() {
        stockQ = $(this).text();

        if (stockQ == 0) {
            $(this).addClass('empty');
        } else {
            $(this).removeClass('empty');
        }

    });
}
function evalLoot() {
    $('.loot').each(function() {
        lootQ = $(this).text();

        if (lootQ == 0) {
            $(this).addClass('empty');
        } else {
            $(this).removeClass('empty');
        }
    });
}

$('.map ul li a').click(travel);

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

        if (stockVal == 0) {
            // purchase denied
            alert('no stock to buy')
        } else if (walletVal == 0) {
            // purchase denied
            alert('aint got no moneys')
        } else {
            // purchase approved
            newStock = parseInt(stockVal) - 1;// subtract from merchant's stock
            stock.text(newStock);// set new stock
            newLoot = parseInt(lootVal) + 1;// add one to your loot
            loot.text(newLoot);// set new loot
            newWallet = walletVal - priceVal;// subtract unit price from wallet
            wallet.text(newWallet);// set new wallet

            evalStock();// check if merchant is out of stock after purchase
        }

    } else if ($this.hasClass('sell')) {
        // making a sale

        if (lootVal == 0) {
            // sale denied
            alert('no loot to sell')
        } else {
            // sale approved
            newStock = parseInt(stockVal) + 1;// add to stock 
            stock.text(newStock);// set new stock
            newLoot = parseInt(lootVal) - 1;// subtract from loot
            loot.text(newLoot);// set new loot
            newWallet = walletVal + priceVal;// add unit price to wallet
            wallet.text(newWallet);// set new wallet

            evalLoot();// check if loot is empty
        }

    } else {
        // do nothing
    }
}

// travelling between locations
function travel() {
    nextPort = $(this).attr('id'),
    portLabel = $(this).text();

    if (fuel == 0) {
        alert('out of fuel, you\'re stuck!');
    } else {
        $('.location p').text(portLabel);// set new currentPort

        newFuel = fuel -= 1

        if (newFuel == 1) {
            alert('almost out of fuel, next trip is the last stop!');
        } else {}

        fuelTank.text(newFuel);
        evalStock();
    }
}

$('.buy, .sell').click(buySell)
$(function() {
    evalLoot();
    evalStock();
}); 