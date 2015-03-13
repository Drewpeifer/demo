function buyFuel() {
    port = map.filter(function (item) {
                // find the current port's JS object
                return item.title == $('.location p').text();
           }),
    $this = $(this),// fuel buy button
    price = $this.siblings('.price').children('p'),
    priceVal = parseInt(price.text()),// price of fuel per unit
    wallet = $('.wallet p'),
    walletVal = parseInt(wallet.text()),// user's current money
    fuelStock = $this.siblings('.stock'),// store's fuel label container
    fuelVal = parseInt(fuelStock.text()),// store's fuel value
    fuelTank = $('.fuel p'),// user's fuel label container
    fuel = parseInt(fuelTank.text());// user's current fuel value

    if (walletVal < priceVal) {
        // not enough money
        showAlert('not enough moneys');
        $('.alert-content').append("<div id='okay' class='button alert-action'><p>Okay</p></div>");
        $('#okay').on('click', function() {
            $('.alert').fadeOut(500);
        });
    } else if (fuelVal == 0) {
        showAlert('Station is out of fuel', 'No more gas at this pump.');
        $('.alert-content').append("<div id='whoops' class='button alert-action' onclick='closeAlert();'><p>Whoops!</p></div>");
    } else {
        // successful purchase
        newWallet = walletVal - priceVal;// subtract unit price from wallet
        wallet.text(newWallet);// set new wallet
        newFuel = fuel + 1;
        fuelTank.text(newFuel);// set new user fuel
        port[0].fuelAvailable = fuelVal - 1;
        fuelStock.text(port[0].fuelAvailable);// set new store stock

        evalLootStockCargo();// check if loot/stock is empty
    }
}

// upgrading cargo
function upgradeCargo() {
    port = map.filter(function (item) {
                // find the current port's JS object
                return item.title == $('.location p').text();
           }),
    upgrades = $(this).siblings('.stock'),
    upgradePrice = parseInt($(this).siblings('.price').children('p').text()),
    remainingUpgrades = parseInt(upgrades.text()),
    walletVal = parseInt($('.wallet p').text());

    if (remainingUpgrades == 0) {
        showAlert('No Upgrades Remaining', 'Your cargo hold can\'t be upgraded any more at this port.');
        $('.alert-content').append("<div id='whoops' class='button alert-action' onclick='closeAlert();'><p>Whoops!</p></div>");
    } else if (walletVal < upgradePrice) {
        showAlert('No money, Captain!', 'We don\'t have enough money to upgrade our cargo');
        $('.alert-content').append("<div id='whoops' class='button alert-action' onclick='closeAlert();'><p>Whoops!</p></div>");
    } else {
        cargoCap = parseInt($('.cargo p.cap').text());
        newCap = cargoCap + 20;// raise cargo cap
        remainingUpgrades = port[0].cargoUpgrades -= 1;// lower stock of upgrades
        port[0].cargoUpgrades = remainingUpgrades;// udpate config obj
        newWallet = walletVal - upgradePrice;// subtract price from wallet
        $('.wallet p').text(newWallet);// set new wallet
        upgrades.text(remainingUpgrades);// set new upgrade stock
        $('.cargo p.cap').text(newCap);// set new cap

        evalLootStockCargo();// check if loot is empty
    }
}

// buying and selling
function buySell() {
    var $this = $(this),// buy/sell button
        item = menu.filter(function (item) {
                // find the current item's JS object
                return item.title == $this.siblings('.item').children('p.title').text();
           }),
        stock = $this.siblings('.stock'),
        stockVal = stock.text(),// merchant item quantity
        loot = $this.siblings('.loot'),
        lootVal = loot.text(),// user's item quantity
        price = $this.siblings('.price').children('p'),
        priceVal = parseInt(price.text()),// price of item per unit
        wallet = $('.wallet p'),
        walletVal = parseInt(wallet.text()),
        cargo = $('.cargo p.loot'),
        cargoVal = parseInt(cargo.text()),// user's current money
        cargoCap = $('.cargo p.cap'),
        cargoCapVal = parseInt(cargoCap.text());// user current cargo limit

    event.stopPropagation();

    if ($this.hasClass('buy')) {
        // making a purchase
        newStock = parseInt(stockVal) - 1,// subtract from merchant's stock
        newLoot = parseInt(lootVal) + 1,// add one to your loot
        newCargo = parseInt(cargoVal) + 1,
        newWallet = walletVal - priceVal;// subtract unit price from wallet

        if (stockVal == 0) {
            // purchase denied, no stock to buy
            showAlert('No stock to buy!', 'Zero means none. Dummy.');
            $('.alert-content').append("<div id='whoops' class='button alert-action' onclick='closeAlert();'><p>Whoops!</p></div>");
        } else if (newWallet < 0) {
            //purchase  denied, not enough money
            showAlert('Ain\'t got no moneys!', 'Get outta here, deadbeat.');
            $('.alert-content').append("<div id='whoops' class='button alert-action' onclick='closeAlert();'><p>Whoops!</p></div>");
        } else if (newCargo > cargoCapVal) {
            //purchase  denied, not enough cargo room
            showAlert('No more cargo space!', 'Sell loot to make room. Or not. It\'s up to you.');
            $('.alert-content').append("<div id='whoops' class='button alert-action' onclick='closeAlert();'><p>Whoops!</p></div>");
        } else {
            // purchase approved
            stock.text(newStock);// set new stock
            loot.text(newLoot);// set new loot in DOM
            item[0].loot = newLoot;// set new loot on object
            cargo.text(newCargo);// set new cargo
            wallet.text(newWallet);// set new wallet
            evalLootStockCargo();// check if merchant is out of stock after purchase

        }

    } else if ($this.hasClass('sell')) {
        // making a sale
        if (lootVal == 0) {
            // sale denied
            showAlert('No loot to sell!', 'Zero means none. Dummy.');
            $('.alert-content').append("<div id='whoops' class='button alert-action' onclick='closeAlert();'><p>Whoops!</p></div>");
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

            evalLootStockCargo();// check if loot is empty
        }

    } else {
        // do nothing
    }
}