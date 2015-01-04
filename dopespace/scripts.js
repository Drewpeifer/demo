var currentPort = $('.location p').text(),
    fuel = $('.fuel p').text();
    
function travel() {
    nextPort = $(this).attr('id'),
    portLabel = $(this).text();
    
    $('.location p').text(portLabel);// set new currentPort
    $('.fuel p').text(fuel -= 1);
}

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
        newStock = parseInt(stockVal) - 1;// subtract from merchant's stock
        stock.text(newStock);// set new stock
        newLoot = parseInt(lootVal) + 1;// add one to your loot
        loot.text(newLoot);// set new loot
        newWallet = walletVal - priceVal;// subtract unit price from wallet
        wallet.text(newWallet);// set new wallet

        evalStock();// check if merchant is out of stock

    } else if ($this.hasClass('sell')) {
        // making a sale
        newStock = parseInt(stockVal) + 1;// add to stock 
        stock.text(newStock);// set new stock
        newLoot = parseInt(lootVal) - 1;// subtract from loot
        loot.text(newLoot);// set new loot
        newWallet = walletVal + priceVal;// add unit price to wallet
        wallet.text(newWallet);// set new wallet

        evalLoot();// check if loot is empty
        
    } else {
        // do nothing
    }

}

$('.buy, .sell').click(buySell)
$(function() {
}); 