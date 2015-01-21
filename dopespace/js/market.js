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