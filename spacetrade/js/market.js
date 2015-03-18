/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomStock(min, max) {
    return Math.round(Math.floor(Math.random() * (max - min + 1)) + min);
}

// build marketplace for initial port
function stockMarket() {
    port = mapA.filter(function (location) {
                // find the current port's JS object
                return location.title == $('.location p').text();
           }),
    marketTable = $('.market table');

    marketTable.empty();// clear out old location data

    if (port[0].fuelStation) {
        // build fuel station row in market table
        marketTable.append('<tr class="fuel-station">' +
                 '<td class="item has-drawer"><p class="title">Fuel</p><span class="drawer" style="display:none;">Adds 1 to your fuel</span></td><td class="price">&#36;<p>' +
                port[0].fuelPrice +
                '</p></td>' +
                '<td class="buy">Buy</td>' +
                '<td class="stock">' + port[0].fuelAvailable + '</td><td></td>' +
                '<td></td>' +
            '</tr>');
    } else {}

    if (port[0].cargoUpgrade) {
        // build fuel station row in market table
        marketTable.append('<tr class="cargo-upgrade">' +
                 '<td class="item has-drawer"><p clas="title">Cargo Hold Upgrade</p><span class="drawer" style="display:none;">(Cargo Capacity +20)</span></td><td class="price">&#36;<p>' +
                port[0].cargoUpgradePrice +
                '</p></td>' +
                '<td class="buy">Buy</td>' +
                '<td class="stock">' + config.cargoUpgrades + '</td><td></td>' +
                '<td></td>' +
            '</tr>');
    } else {}

    menuA.forEach( function (stock) {

        minStock = stock.baseStock + (stock.baseStock * -stock.stockFlux),
        maxStock = stock.baseStock + (stock.baseStock * stock.stockFlux),
        newStock = getRandomStock(minStock, maxStock),
        minPrice = stock.basePrice + (stock.basePrice * -port[0].priceFlux),
        maxPrice = stock.basePrice + (stock.basePrice * port[0].priceFlux),
        newPrice = getRandomStock(minPrice, maxPrice);

        marketTable.append('<tr>' +
                '<td class="item has-drawer"><p class="title">' +
                stock.title +
                '</p><span class="drawer" style="display:none;">' +
                stock.description +
                '</span></td><td class="price">&#36;<p>' +
                newPrice +
                '</p></td>' +
                '<td class="buy">Buy</td>' +
                '<td class="stock">' +
                newStock +
                '</td><td class="loot">' + stock.loot + '</td>' +
                '<td class="sell">Sell</td>' +
            '</tr>');
    });


    $('.has-drawer').off().on('click', function() {
        if ($(this).hasClass('drawer-open')) {
            $(this).removeClass('drawer-open')
                   .children('.drawer')
                   .slideUp();
        } else {
            $('.drawer-open').removeClass('drawer-open')
                   .children('.drawer')
                   .slideUp();
            $(this).addClass('drawer-open')
                   .children('.drawer')
                   .slideDown();
        }
    });

    marketFlux = getRandomNumber(1,3);// returns 1 or 2, max is actually exclusive
    console.log('marketFlux = ' + marketFlux);
    if (marketFlux == 1) {
        // no sale or hike today
        console.log('No sale/hike today!');
    } else {
        // sale/hike today!
        saleOrHike = getRandomNumber(1,3),// returns 1 or 2
        flux = getRandomNumber(2,6),// returns 2 thru 5
        randomStock = menuA[Math.floor(Math.random()*menuA.length)];// pick random stock
        console.log('saleOrHike = ' + saleOrHike);
        console.log('flux = ' + flux);
        console.log('randomStock = ' + randomStock.title + ' @ ' + randomStock.basePrice);


        if (saleOrHike == 1) {
            // it's a sale!
            // find randomLoots price cell
            targetItemCell = $('.market td:contains("' + randomStock.title + '")'),
            targetPriceCell = targetItemCell.siblings('.price');
            targetPrice = targetPriceCell.children('p');
            targetPriceVal = targetPrice.children('p').text();
            // recalc value
            newPriceVal = Math.floor(parseInt(randomStock.basePrice) / flux);
            //set new loot value in DOM
            targetPrice.text(newPriceVal);
            targetPrice.addClass('sale');// tag as sale price
            targetItemCell.children('.title').append('<p class="sale">&nbsp;(Sale!)</p>');
            console.log('Sale! Today, ' + randomStock.title + " only costs " +  newPriceVal);
        } else {
            // it's a hike!
            // find randomLoots price cell
            targetItemCell = $('.market td:contains("' + randomStock.title + '")'),
            targetPriceCell = targetItemCell.siblings('.price');
            targetPrice = targetPriceCell.children('p');
            targetPriceVal = targetPrice.children('p').text();
            // recalc value
            newPriceVal = Math.floor(parseInt(randomStock.basePrice) * flux);
            //set new loot value in DOM
            targetPrice.text(newPriceVal);
            targetPrice.addClass('hike');// tag as hike price
            targetItemCell.children('.title').append('<p class="hike">&nbsp;(Hike!)</p>');
            console.log('Hike! Today, ' + randomStock.title + " costs " +  newPriceVal);
        }
    }

}

// check each stock and loot amount,
// if any equal zero, disable the
// corresponding buy/sell button
function evalLootStockCargo() {
    // TODO: only run this onLoad and
    // other crucial times, build smaller
    // function for buy/sell that just
    // checks sibling loot and stock instead of all
    $('.loot').each(function() {
        lootQ = $(this).text();

        if (lootQ == 0) {
            $(this).siblings('.sell').addClass('invalid');
        } else {
            $(this).siblings('.sell').removeClass('invalid');
        }
    });
    $('.stock').each(function() {
        stockQ = $(this).text();

        if (stockQ == 0) {
            $(this).siblings('.buy').addClass('invalid');
        } else {
            $(this).siblings('.buy').removeClass('invalid');
        }

    });
    if ($('.cargo p.loot').text() == $('.cargo p.cap').text()) {
        $('.cargo').removeClass('valid').addClass('invalid');
    } else {
        $('.cargo').removeClass('invalid').addClass('valid');
    }
}