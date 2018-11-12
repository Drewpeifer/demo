$('#help').bind('click', function() {
    showAlert('SpaceTrade - Help', 'Hover over elements to learn more about them. On mobile devices, tap and hold (long press).');
});

function buildTooltips() {
	var location = $('.location #description'),
		map = $('#mapToggle'),
		wallet = $('#wallet'),
		cargo = $('#cargo'),
		fuel = $('#fuel'),
		commodity = $('.market-header span:first-child'),
		price = $('.market-header span:nth-child(3)'),
		stock = $('.market-header span:nth-child(4)'),
		loot = $('.market-header span:last-child'),
		score = $('#score'),
		turn = $('#turn'),
		allElements = [location, map, wallet, cargo, fuel, commodity, price, stock, loot, score, turn];
		// NOTE: all the market commodities have their labels manually tagged with
		// a tooltip class and title attribute within app.js

	// tag element for tooltipster
	$.each(allElements, function() {
		this.addClass('tooltip');
	});
	// set tooltip content for each element
	location.attr('title', 'This is your current location. Click the planet icon to open the Map and select a destination to travel to.');
	map.attr('title', 'Click here to open the map and travel to to a new destination.');
	wallet.attr('title', 'This is how much money you have. Use it to buy more fuel, or cargo. It\'s a good idea to keep a little extra around, you never know what expenses you might incur during your travels.');
	cargo.attr('title', 'This is your current cargo amount / your total cargo capacity. Certain stations (and helpful strangers) can upgrade your cargo hold more than once.');
	fuel.attr('title', 'This is your current fuel amount. Every time you travel, one unit of fuel is used. Only certain locations sell fuel, so remember to stock up before you go somewhere without a fuel station.');
	commodity.attr('title', 'Listed below are all the goods that the current port sells. Most goods are available everywhere, but not everything.');
	price.attr('title', 'Listed below are the prices for each item this port has for sale. Each port has different base prices, and different levels of fluctuations, for each item. Fuel prices never fluctuate from visit to visit, but each station has its own static fuel price.');
	stock.attr('title', 'Only a certain amount of each commodity is available at each port. Stocks will refresh each time you visit, but they will vary from visit to visit. If you sell a commodity, it will be added to the port\'s current stock, but it may not be available if you leave and return.');
	loot.attr('title', 'This column shows the amount of each commodity currently in your cargo hold.');
	score.attr('title', 'Your current score is affected by your money, cargo value, and the number of turns you\'ve taken.');
	turn.attr('title', 'This is how many times you\'ve travelled between starports.');
}