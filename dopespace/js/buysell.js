// buying and selling
function buySell() {
    var $this = $(this),// buy/sell button
        item = menu.filter(function (item) {
                // find the current port's JS object
                return item.title == $this.siblings('.item').text();
           }),
        stock = $this.siblings('.stock'),
        stockVal = stock.text(),// merchant item quantity
        loot = $this.siblings('.loot'),
        lootVal = loot.text(),// user's item quantity
        price = $this.siblings('.price').children('p'),
        priceVal = parseInt(price.text()),// price of item per unit
        wallet = $('.wallet p'),
        walletVal = parseInt(wallet.text()),
        cargo = $('.cargo p'),
        cargoVal = parseInt(cargo.text()),// user's current money
        cargoCap = $('.cargo span'),
        cargoCapVal = parseInt(cargoCap.text());// user current cargo limit

    if ($this.hasClass('buy')) {
        // making a purchase
        newStock = parseInt(stockVal) - 1,// subtract from merchant's stock
        newLoot = parseInt(lootVal) + 1,// add one to your loot
        newCargo = parseInt(cargoVal) + 1,
        newWallet = walletVal - priceVal;// subtract unit price from wallet

        if (stockVal == 0) {
            // purchase denied, no stock to buy
            alert('no stock to buy');
        } else if (newWallet < 0) {
            //purchase  denied, not enough money
            alert('aint got enough moneys');
        } else if (newCargo > cargoCapVal) {
            //purchase  denied, not enough cargo room
            alert('no more cargo room, sell loot to make space');
        } else {
            // purchase approved
            stock.text(newStock);// set new stock
            loot.text(newLoot);// set new loot in DOM
            item[0].loot = newLoot;// set new loot on object
            cargo.text(newCargo);// set new cargo
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
            newCargo = parseInt(cargoVal) - 1
            newWallet = walletVal + priceVal;// add unit price to wallet

            stock.text(newStock);// set new stock
            loot.text(newLoot);// set new loot
            item[0].loot = newLoot;//set new loot on object
            cargo.text(newCargo);// set new cargo
            wallet.text(newWallet);// set new wallet

            evalLootStock();// check if loot is empty
        }

    } else {
        // do nothing
    }
}