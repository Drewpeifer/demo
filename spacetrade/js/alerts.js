function showWelcome() {
	panel = '<div id="welcome" class="peripheral"></div>',
	header = '<h1>Welcome to SpaceTrade</h1>',

	description = "<p>It's the year 3021 and planets are now boring, but space is still the " +
					 "coolest. That's why you sold everything you own and love, including " +
					 "your family, to buy this awesome new starship. It goes super fast, " +
					 "comes with a crew already inside it, trained and everything, plus " +
					 "a sweet sound system.</p>" +
					"<p>You're still docked at Earth but you're ready to blast off. Feel free to peruse " +
					"the marketplace on Earth, or click the map to pick your next destination.</p>" +
					"<p>The objective is to buy low, sell high, and never stop flying. If you run " +
					"out of cash, gas, or both, we're cooked. Also, if we hit a star, we're cooked. " +
					"Or if someone hits us with a microwave gun... you get the idea. " +
					"It's dangerous out here.</p>";
	button = "<button id='closeWelcome'>Let's Do This!</button>";
	// hide any visible peripherals
	$('.peripheral').hide();
	// build welcome UI
	$('#app').prepend(panel);
	$('#welcome').append(header)
				.append(description)
				.append(button);

	$('#closeWelcome').bind('click', function() {
		// set captain name from home screen
		console.log('closeWelcome running');
		if ($('#captain').val() == "") {
			console.log('no name given, so youre smith');
			stats.captainName = "Smith";
			stats.lastCaptainName = "Smith";
		} else {
			console.log('so your name is ' + $('#captain').val());
			stats.captainName = $('#captain').val();
			stats.lastCaptainName = $('#captain').val();
		}
		createSession();
		$('#welcome').slideUp();
		});
	}

// general pop up alert, used to notify user of misc
// events or upcoming conditions (such as game over soon)
function showAlert(header, message) {
	alertPanel = $('#alert');
	alertContent = '<ul><li class="header">' +
					'<p>' + header + '</p></li>' +
					'<li class="description">' +
					'<p>' + message + '</p></li>' +
					'<li><button id="closeAlert">Roger That</button></li></ul>';

	alertPanel.html(alertContent);
	alertPanel.slideDown();
	$('#closeAlert').bind('click', function() {
		alertPanel.empty().slideUp();
	});
}

// calculate current total cargo amount
// in your cargo hold (used in other funcs)
function cargoSum(menu) {
    var totalCargo = 0;
    for (var i = 0; i < menu.length; i++) {
        v = parseFloat(menu[i].currentLoot);
        totalCargo += v;
    }
    return totalCargo;
}

// calculate value of all the goods currently
// in your cargo hold (used in other funcs)
function cargoValueSum(menu) {
	itemValueArray = [];

	$.each(menu, function() {
		if (this.currentLoot > 0) {
			itemValue = this.currentLoot * this.currentPrice;
			console.log('you have ' + this.currentLoot + ' ' + this.title + ' worth ' + itemValue);
			itemValueArray.push(itemValue);
		} else {
			// do nothing
		}
	});
	console.log(itemValueArray);
	return itemValueArray.reduce(function(a, b) { return a + b; }, 0);
}

// show gameOver message when certain conditions are met:
// After travel, perform several checks on user stats...
// If gas hits 0:
//// does station sell fuel?
////// if no, game over!
////// if yes, do you have enough money to buy some?
//////// if no, do you have enough goods to sell to earn gas money?
////////// if no, game over!
// if money hits 0:
//// do you have any goods to sell?
////// if no, game over!
function gameOverCheck() {
// related stats
	walletAmount = stats.wallet;
	fuelAmount = stats.fuel;
	isFuelStation = stats.port.fuelStation;
	fuelStationPrice = stats.port.fuelPrice;
	currentCargoAmount = cargoSum(stats.menu);
	currentCargoValue = cargoValueSum(stats.menu);
	
// Game Over UI / content defaults
	panel = '<div id="gameOver" class="peripheral"></div>',
	header = '<h1>Game Over!</h1>',
	setup = 'Unfortunately you botched it, Captain.',
	circumstance = 'Something went awry and you weren\'t clever enough to fix it.',
	stinger = 'Guess we\'re lost in space. Thanks, Captain. Real nice.',
	score = "Score: ",
	button = "<button id='closeGameOver'>Curses!</button>";

//// Check Conditions ////
// If game over, show gameOver message.
// If game over unless player takes specific action, show action hint
// If conditions are good, keep on playing.

console.log('running gameOverCheck...');
if (fuelAmount == 2) {
	// fuel is low
	if (!isFuelStation) {
		// no fuel here
		showAlert('Low Fuel Alert!', 'You have 2 units of fuel, better get to a system with a fuel station soon...');
	}
	// fuel for sale here
	showAlert('Low Fuel Alert!', 'You have 2 units of fuel, maybe buy some here?');
} else if (fuelAmount == 1) {
	// fuel is REALLY low
	if (!isFuelStation) {
		// no fuel here
		showAlert('CRITICAL Fuel Alert!', 'You have 1 unit of fuel left, hope your next destination sells some!');
	}
	// fuel for sale here
	showAlert('CRITICAL Fuel Alert!', 'You have 1 unit of fuel left, better buy some before you leave!');
} else if (fuelAmount == 0) {
		// out of gas! are you at a fuel station?
		console.log('your fuel is zero');
		if (isFuelStation) {
			// okay, this is a fuel station, but
			// do you have enough money to buy gas?
			console.log('this is a fuel station');
			if (walletAmount < fuelStationPrice) {
				// you're too poor to buy gas,
				// but do you have enough cargo to sell for gas?
				console.log('youre too poor to buy gas');
				if (currentCargoValue < fuelStationPrice) {
					// so you don't have enough cash to buy gas, and
					// your cargo isn't worth enough to pay for gas, but
					// if you combine cargo value and your wallet, will
					// that be enough for gas?
					if ((currentCargoValue + walletAmount) < fuelStationPrice) {
						// out of gas, out of cash, and not enough cargo to trade for gas!
						// you don't even have anything worth the price
						// of one fuel unit, you're so bad at this game
						circumstance = 'Well Cap, we\'re out of fuel, and even though ' +
							'this station sells fuel, we don\'t have enough cash to buy any, ' +
							'and we don\'t have enough cargo to trade for some fuel. Things don\'t ' +
							'look very good for us, I guess we just aren\'t cut out for ' +
							'this line of work.';
						console.log('you have no gas, cash, or cargo to trade');
						showGameOver();// show gameOver message with specified text
					} else {
						// you need to sell some cargo in order to buy fuel
						showAlert('Out Of Gas!', 'You have $' + currentCargoValue + ' worth of cargo to trade');
						console.log('you need to sell some cargo to buy gas, its worth ' + currentCargoValue);
					}
				} else {
					// you need to sell some cargo in order to buy fuel
					showAlert('Out Of Gas!', 'You have $' + currentCargoValue + ' worth of cargo to trade');
					console.log('you need to sell some cargo to buy gas, its worth ' + currentCargoValue);
				}
			} else {
				// you should have enough money to buy gas
				showAlert('Out Of Gas!', 'You should have enough money to buy fuel though');
				console.log('you have gas money');
			}
		} else {
			// out of gas and this is not a fuel station!
			circumstance = 'We\'re out of gas and this isn\'t a fuel station! So, we\'re adrift and ' +
				'our power supply will run out in a little while. This isn\'t good, Captain. ' +
				'Systems show all the escape pods have been jettisoned, too; wow, I guess the crew ' +
				'saw this one coming. Oh, well. Wanna go raid the cafeteria?';
			console.log('youre out of gas and this is not a fuel station');
			showGameOver();// show gameOver message with specified text
		}
	} else {
		// you're good to go, continue playing
		console.log('gameOver conditions not met, continue playing');
	}
	function showGameOver() {
		console.log('running showGameOver...');
		// This updates the "top" stats in the cookie,
		// the gameOver UI is built down below...
		currentTopScore = getCookie('topScore');
		currentTopCaptain = getCookie('topCaptain');
		currentTopTurns = getCookie('topTurns');
		highScore1 = getCookie('highScore1');
		highScore1Captain = getCookie('highScore1Captain');
		highScore1Turns = getCookie('highScore1Turns');
		highScore2 = getCookie('highScore2');
		highScore2Captain = getCookie('highScore2Captain');
		highScore2Turns = getCookie('highScore2Turns');
		highScore3 = getCookie('highScore3');
		highScore3Captain = getCookie('highScore3Captain');
		highScore3Turns = getCookie('highScore3Turns');
		// determine whether or not the current score
		// belongs on the top / high score list
		// if so, save current turns and pilot name
		// and also move other scores down on the list
		if (stats.score >= currentTopScore || !currentTopScore) {
			console.log('New top score! Updating cookie...');
			// set old top score to high score 1
			setCookie('highScore1',currentTopScore,100);
			setCookie('highScore1Captain',currentTopCaptain,100);
			setCookie('highScore1Turns',currentTopTurns,100);
			// set current stats to top stats
			setCookie('topScore',stats.score,100);
			setCookie('topCaptain',stats.captainName,100);
			setCookie('topTurns',stats.turn,100);
			// set this captain as last captain
			setCookie('lastCaptainName',stats.captainName,100);
		} else if (stats.score >= highScore1 || !highScore1) {
			console.log('You got high score 1! Updating cookie...');
			// set old score 1 to score 2
			setCookie('highScore2',highScore1,100);
			setCookie('highScore2Captain',highScore1Captain,100);
			setCookie('highScore2Turns',highScore1Turns,100);
			// set current stats to high score 1 stats
			setCookie('highScore1',stats.score,100);
			setCookie('highScore1Captain',stats.captainName,100);
			setCookie('highScore1Turns',stats.turn,100);
			// set this captain as last captain
			setCookie('lastCaptainName',stats.captainName,100);
		} else if (stats.score >= highScore2 || !highScore2) {
			console.log('You got high score 2! Updating cookie...');
			// set old score 3 to score 2
			setCookie('highScore3',highScore2,100);
			setCookie('highScore3Captain',highScore2Captain,100);
			setCookie('highScore3Turns',highScore2Turns,100);
			// set current stats to high score 2
			setCookie('highScore2',stats.score,100);
			setCookie('highScore2Captain',stats.captainName,100);
			setCookie('highScore2Turns',stats.turn,100);
			// set this captain as last captain
			setCookie('lastCaptainName',stats.captainName,100);
		} else if (stats.score >= highScore3 || !highScore3) {
			console.log('You got high score 2! Updating cookie...');
			// set current stats to high score 3
			setCookie('highScore3',stats.score,100);
			setCookie('highScore3Captain',stats.captainName,100);
			setCookie('highScore3Turns',stats.turn,100);
			// set this captain as last captain
			setCookie('lastCaptainName',stats.captainName,100);
		}
		// This actually builds the gameOver message UI if conditions are met
		// using the content from the condition checks, or default content
		$('#map').slideUp();// hide map if necessary
		$('#app').prepend(panel);
		$('#gameOver').append(header)
					.append(setup)
					.append(circumstance)
					.append(stinger)
					.append(button)
					.show();

		$('#closeGameOver').bind('click', function() {
			$('#gameOver').slideUp();
		});
	}
}

// score calculation
// {[wallet + (fuel x 1000) + (cargo value x 2)] X # of turns taken} / 10
// run on the following events:
// travel
// incident close
// buy/sell
// game over
function updateScore() {
	wallet = stats.wallet,
	cargoValue = cargoValueSum(stats.menu),
	turns = stats.turn;
	preScore = (wallet * 2) + cargoValue;
	score = Math.floor((preScore * turns) * .1);
	currentTopScore = getCookie('topScore');

	console.log('running updateScore...');
	console.log('wallet is ' + wallet);
	console.log('cargoValue is ' + cargoValue);
	console.log('turns = ' + turns);
	console.log('preScore = (wallet * 2)  + cV');
	console.log('preScore = ' + preScore);
	console.log('score = {[(wallet * 2) + cargo value] X # of turns taken} / 10');
	console.log('score = {[(' + wallet + ' * 2) + ' + cargoValue + '] X ' + turns + '} / 10');
	console.log('final score = ' + score);

	// set the value on the player stats object
	stats.score = score;

	console.log('starting COOKIE update...');
	// set the value on the session cookie
	setCookie('sessionScore',stats.score,10);
	setCookie('sessionTurns',stats.turn,10);

	if (stats.score >= currentTopScore || !currentTopScore) {
		setCookie('topScore',stats.score,10);
	} else {
		// do nothing
	}

}