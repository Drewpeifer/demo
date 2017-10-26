$(document).ready(function(){
//	makeManyStars();
	buildMarket();
});

var app = new Vue({
		el: '#app',
		data: stats
});

// Market stuff

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
function buildMarket() {
	// find current port
	currentPort = stats.port;
	marketTable = $('#market ul');

	// clear out old menu data
	marketTable.empty();
	// add column headers
    marketTable.append('<li class="market-header"><span class="title">Commodity' +
				' (Sale/Hike)</span>' +
				'<span class="action">SLIDER + ACTION</span>' +
				'<span class="num">Price</span>' +
				'<span class="num">Stock</span>' +
				'<span class="num">Loot</span></li>');
    // check for fuel / upgrade availability, build rows if true
    if (currentPort.fuelStation) {
marketTable.append('<li><span class="title">Fuel</span>' +
					'<span class="action">SLIDER + ACTION</span>' +
					'<span class="num">' + currentPort.fuelPrice + '</span>' +
					'<span class="num">' + currentPort.fuelAvailable + '</span>' +
					'<span class="num">' + stats.fuel + '</span></li>');
    } else if (port.cargoUpgrade) {
		marketTable.append('<li><span class="title">Cargo Hold Upgrade</span>' +
			'<span class="action">SLIDER + ACTION</span>' +
			'<span class="num">' + currentPort.cargoUpgradePrice + '</span>' +
			'<span class="num">' + stats.remainingCargoUpgrades + '</span>' +
			'<span class="num">' + (config.cargoUpgrades - stats.remainingCargoUpgrades) + '</span></li>');
    } else {
		// do nothing
	}
	// populate the marketTable
	menuA.forEach( function (stock) {

		// calculate port-specific variables
        minStock = stock.baseStock + (stock.baseStock * -stock.stockFlux),
        maxStock = stock.baseStock + (stock.baseStock * stock.stockFlux),
        newStock = getRandomStock(minStock, maxStock),// set random stock amount within min/max range
        minPrice = stock.basePrice + (stock.basePrice * -currentPort.priceFlux),
        maxPrice = stock.basePrice + (stock.basePrice * currentPort.priceFlux),
        newPrice = getRandomStock(minPrice, maxPrice);// set random price value within min/max range
        // append commodity row to UI
        marketTable.append('<li><span class="title">' + stock.title +
					' (Sale!)</span>' +
					'<span class="action">SLIDER + ACTION</span>' +
					'<span class="num">' + newPrice + '</span>' +
					'<span class="num">' + newStock + '</span>' +
					'<span class="num">' + stock.loot + '</span></li>');
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
            randomStock.currentPrice(newPriceVal);
            targetPrice.addClass('sale');// tag as sale price
            targetItemCell.children('.title').after('<p class="sale"> (Sale!)</p>');
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
            targetItemCell.children('.title').after('<p class="hike">&nbsp;(Hike!)</p>');
            console.log('Hike! Today, ' + randomStock.title + " costs " +  newPriceVal);
        }
    }
}