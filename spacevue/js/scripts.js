$(document).ready(function(){
//	makeManyStars();
	buildMarket();
});

var app = new Vue({
		el: '#app',
		data: stats
});

// Market stuff

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomStock(min, max) {
    return Math.round(Math.floor(Math.random() * (max - min + 1)) + min);
}

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
}