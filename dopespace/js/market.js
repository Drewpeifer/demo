/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomStock(min, max) {
    return Math.round(Math.floor(Math.random() * (max - min + 1)) + min);
}

// build marketplace for initial port
function stockMarket() {
    port = map.filter(function (location) {
                // find the current port's JS object
                return location.title == $('.location p').text();
           }),
    marketTable = $('.market table');

    marketTable.empty();// clear out old location data

    if (port[0].fuelStation) {
        marketTable.append('<tr class="fuel-station">' +
                 '<td>Fuel</td><td class="price">&#36;<p>' +
                port[0].fuelPrice +
                '</p>/unit</td>' +
                '<td class="buy">Buy<br />>></td>' +
                '<td class="stock">3</td><td></td>' +
                '<td></td>' +
            '</tr>');
    } else {}

    menu.forEach( function (stock) {

        minStock = stock.baseStock + (stock.baseStock * -stock.stockFlux),
        maxStock = stock.baseStock + (stock.baseStock * stock.stockFlux),
        newStock = getRandomStock(minStock, maxStock),
        minPrice = stock.basePrice + (stock.basePrice * -port[0].priceFlux),
        maxPrice = stock.basePrice + (stock.basePrice * port[0].priceFlux),
        newPrice = getRandomStock(minPrice, maxPrice);

        marketTable.append('<tr>' +
                '<td class="item">' +
                stock.title +
                '</td><td class="price">&#36;<p>' +
                newPrice +
                '</p>/' + stock.unit + '</td>' +
                '<td class="buy">Buy<br />>></td>' +
                '<td class="stock">' +
                newStock +
                '</td><td class="loot">' + stock.loot + '</td>' +
                '<td class="sell">Sell<br /><<</td>' +
            '</tr>');
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
        randomStock = menu[Math.floor(Math.random()*menu.length)];// pick random stock
        console.log('saleOrHike = ' + saleOrHike);
        console.log('flux = ' + flux);
        console.log('randomStock = ' + randomStock.title + ' @ ' + randomStock.basePrice);


        if (saleOrHike == 1) {
            // it's a sale!
            // find randomLoots price cell
            targetPriceCell = $('.market td:contains("' + randomStock.title + '")').siblings('.price');
            targetPrice = targetPriceCell.children('p');
            targetPriceVal = targetPrice.children('p').text();
            // recalc value
            newPriceVal = Math.floor(parseInt(randomStock.basePrice) / flux);
            //set new loot value in DOM
            targetPrice.text(newPriceVal);
            targetPrice.addClass('sale');// tag as sale price
            console.log('Sale! Today, ' + randomStock.title + " only costs " +  newPriceVal);
        } else {
            // it's a hike!
            // find randomLoots price cell
            targetPriceCell = $('.market td:contains("' + randomStock.title + '")').siblings('.price');
            targetPrice = targetPriceCell.children('p');
            targetPriceVal = targetPrice.children('p').text();
            // recalc value
            newPriceVal = Math.floor(parseInt(randomStock.basePrice) * flux);
            //set new loot value in DOM
            targetPrice.text(newPriceVal);
            targetPrice.addClass('hike');// tag as hike price
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
    if ($('.cargo p.loot').text() == $('.cargo p.cap').text()) {
        $('.cargo').removeClass('valid').addClass('invalid');
    } else {
        $('.cargo').removeClass('invalid').addClass('valid');
    }
}