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
           });

    $('.market table').empty();// clear out old location data

    menu.forEach( function (stock) {

        minStock = stock.baseStock + (stock.baseStock * -stock.stockFlux),
        maxStock = stock.baseStock + (stock.baseStock * stock.stockFlux),
        newStock = getRandomStock(minStock, maxStock),
        minPrice = stock.basePrice + (stock.basePrice * -port[0].priceFlux),
        maxPrice = stock.basePrice + (stock.basePrice * port[0].priceFlux),
        newPrice = getRandomStock(minPrice, maxPrice);

        $('.market table').append('<tr>' +
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
}

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