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

   $('#app').prepend(panel);
   $('#welcome').append(header)
				.append(description)
				.append(button);

   $('#closeWelcome').bind('click', function() {
	$('#welcome').slideUp();
   });
}

// show gameOver message when certain conditions are met:
// After travel, perfrom several checks on user stats...
// If gas hits 0:
//// does station sell fuel?
////// if no, game over!
////// if yes, do you have enough money to buy some?
//////// if no, do you have enough goods to sell to earn gas money?
////////// if no, game over@
// if money hits 0:
//// do you have any goods to sell?
////// if no, game over!
function gameOverCheck() {
// related stats
	walletAmount = stats.wallet;
	fuelAmount = stats.fuel;
	isFuelStation = stats.port.fuelStation;
	fuelStationPrice = stats.port.fuelPrice;
	currentCargo = cargoSum(menu);
	currentCargoValue = cargoValue(menu);
	
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
// If game over unless player takes specific action, show ation hint
// If conditions are good, keep on playing.

////////////// TODO!!!! /////////////
// Make sure gameover checks make sense, and trigger, with appropriate messages
// Then take care of edge cases with tipContent and showAlert

// are you out of money?
	if (walletAmount == 0) {
		// Do you. have any cargo to sell? If you do we will leave you alone.
		if (currentCargo == 0) {
			// no cargo to sell for money, hope you have fuel and can encounter a good event
			tipContent = 'Captain, sir: We have no money and no cargo to get any money. ' +
				'This is a distressing and emabarassing situation, given our profession. ' +
				'Our only hope is to cruise around on whatever fuel we have left.'
		} else {
			// you should sell some cargo to get some money
		}
	}
// are you out of gas?
	} else if (fuelAmount == 0) {
		// out of gas! are you at a fuel station?
		if (isFuelStation) {
			// okay, this is a fuel station, but
			// do you have enough money to buy gas?
			if (walletAmount < fuelStationPrice) {
				// you're too poor to buy gas,
				// but do you have enough cargo to sell for gas?
				if (currentCargoValue < fuelStationPrice) {
					// out of gas, out of cash, and not enough cargo to trade for gas!
					// you don't even have anything worth the price
					// of one fuel unit, you're so bad at this game
					description = 'Well Cap, we\'re out of fuel, and even though ' +
						'this station sells fuel, we don\'t have enough cash to buy any, ' +
						'and we don\'t have enough cargo to trade for some fuel. Things don\'t ' +
						'look very good for us, I guess we just aren\'t cut out for ' +
						'this line of work.';
				} else {
					// you need to sell some cargo in order to buy fuel
				}
			} else {
				// you should have enough money to buy gas
			}
		} else {
			// out of gas and this is not a fuel station!
			description = 'We\'re out of gas and this isn\'t a fuel station! So, we\'re adrift and ' +
				'our power supply will run out in a little while. This isn\'t good, Captain. ' +
				'Systems show all the escape pods have been jettisoned, too; wow, I guess the crew ' +
				'saw this one coming. Oh, well. Wanna go raid the cafeteria?';
		}
	} else {
		// you're good to go, you have gas, continue playing
	}
	function showGameOver() {
		// This actually builds the gameOver message UI if conditions are met
		// using the content from the condition checks, or default content
		$('#app').prepend(panel);
		$('#gameOver').append(header)
					.append(setup)
					.append(circumstance)
					.append(stinger)
					.append(button);

		$('#closeGameOver').bind('click', function() {
			$('#gameOver').slideUp();
		});
	}
}