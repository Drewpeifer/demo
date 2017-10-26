$(document).ready(function(){
//	makeManyStars();
	buildMarket();
});

var app = new Vue({
		el: '#app',
		data: stats
});

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

	// populate the marketTable
	menuA.forEach( function (stock) {

		// calculate port-specific variables
        minStock = stock.baseStock + (stock.baseStock * -stock.stockFlux),
        maxStock = stock.baseStock + (stock.baseStock * stock.stockFlux),
        newStock = getRandomStock(minStock, maxStock),// set random stock amount within min/max range
        minPrice = stock.basePrice + (stock.basePrice * -currentPort.priceFlux),
        maxPrice = stock.basePrice + (stock.basePrice * currentPort.priceFlux),
        newPrice = getRandomStock(minPrice, maxPrice);// set random price value within min/max range
        // append row to UI
        marketTable.append('<li><span>' + stock.title + '</span>' +
					'<span>Sale/Hike</span>' +
					'<span>SLIDER + ACTION</span>' +
					'<span>' + newPrice + '</span>' +
					'<span>' + newStock + '</span>' +
					'<span>' + stock.loot + '</span></li>');
    });
}