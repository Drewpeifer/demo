// Market stuff
// Takes base prices, applies port price and stock randomly via flux
// Also randomly generates sale/hike conditions on a random commodity

// return random number from min (inclusive) to max (inclusive)
// only returns WHOLE numbers
function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// TODO: can these be combined?

// Returns a random integer between min (inclusive) and max (inclusive)
// Using Math.round() will give you a non-uniform distribution!
function getRandomStock(min, max) {
    return Math.round(Math.floor(Math.random() * (max - min + 1)) + min);
}

// populate the marketplace with the current port's available goods
function buildMarket(currentPort) {
	marketTable = $('#market ul');

    // clear sale/hike tags
    $('.sale, .hike').remove();

	// calculate flux-based prices and stock amounts, and apply to 'currentX' props
	menuA.forEach( function (stock) {

        minStock = stock.baseStock + (stock.baseStock * -stock.stockFlux),
        maxStock = stock.baseStock + (stock.baseStock * stock.stockFlux),
        newStock = getRandomStock(minStock, maxStock),// set random stock amount within min/max range
        stock.currentStock = newStock;// set currentStock to newStock
        minPrice = stock.basePrice + (stock.basePrice * -currentPort.priceFlux),
        maxPrice = stock.basePrice + (stock.basePrice * currentPort.priceFlux),
        newPrice = getRandomStock(minPrice, maxPrice);// set random price value within min/max range
        stock.currentPrice = newPrice;// set currentPrice to newPrice

    });

    // figure out of there's a sale or hike, and apply it to a random commodity
    marketFlux = getRandomNumber(1,3);// returns 1 or 2, max is actually exclusive
    console.log('marketFlux = ' + marketFlux);
    if (marketFlux == 1) {
        // no sale or hike today
        console.log('No sale/hike today!');
    } else {
        // sale/hike today!
        saleOrHike = getRandomNumber(1,3),// returns 1 or 2, sale = 1 / hike = 2
        flux = getRandomNumber(2,6),// returns 2 thru 5, determines size of sale/hike
        randomStock = menuA[Math.floor(Math.random()*menuA.length)];// pick random stock
        console.log('saleOrHike = ' + saleOrHike);
        console.log('flux = ' + flux);
        console.log('randomStock = ' + randomStock.title + ' @ ' + randomStock.basePrice);

        if (saleOrHike == 1) {
            // it's a sale!
            // recalc commodity price value
            newPriceVal = Math.floor(parseInt(randomStock.basePrice) / flux);
            //set new loot price
            randomStock.currentPrice = newPriceVal;
            // add span and class to appropriate commodity
            targetStock = $('#market li.' + randomStock.safeTitle + ' span.title');
            targetStock.append('<span class="sale">&nbsp;(Sale)</span>');
            console.log('Sale! Today, ' + randomStock.title + " only costs " +  randomStock.currentPrice);

        } else {
            // it's a hike!
            // recalc commodity price value
            newPriceVal = Math.floor(parseInt(randomStock.basePrice) * flux);
            //set new loot value in DOM
            randomStock.currentPrice = newPriceVal;
            // add class to appropriate commodity row
            targetStock = $('#market li.' + randomStock.safeTitle + ' span.title');
            targetStock.append('<span class="hike">&nbsp;(Hike)</span>');
            console.log('Hike! Today, ' + randomStock.title + " costs " +  newPriceVal);
        }
    }
}