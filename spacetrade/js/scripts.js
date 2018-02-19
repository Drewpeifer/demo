$(document).ready(function(){
	makeManyStars();
    buildMarket(stats.port);// builds initial marketplace
    showWelcome();
    // enable tooltipster via tooltips.js
    buildTooltips();
    $('.tooltip').tooltipster({
        theme: 'tooltipster-light',
        animation: 'fade',
        arrow: true,
        maxWidth: 400,
        timer: 6000,
        delay: 1000
    }).addClass('unselectable');

});

function closeIncident() {
    $('button.disabled-good').removeClass('disabled-good')
                             .attr('disabled', false);
    $('button.disabled-bad').removeClass('disabled-bad')
                            .attr('disabled', false);
    $('li.outcome-description').html('');
    $('#incident').hide();
    updateScore();
    gameOverCheck();
}

// incident functions (called by outcomes of incidents)
function nothingHappened() {
    console.log('nothing happened!');
}

function fuelChange(delta) {
    if (delta > 0) {
        stats.fuel += delta;
        chosenEffect = '+' + delta + ' fuel';
    } else {
        currentFuel = stats.fuel;

        if (currentFuel == 0) {
            chosenEffect = "You were out of fuel already! No change.";
        } else if ((currentFuel += delta) <= 0) {
            stats.fuel = 0;
            chosenEffect = "Oh no, your tank is empty!";
        } else {
            stats.fuel += delta;
            chosenEffect = '' + delta + ' fuel';
        }
    }
}

function walletChange(delta) {
    if (delta > 0) {
        stats.wallet += delta;
        chosenEffect = '+' + delta + ' credits';
    } else {
        // validation
        currentWallet = stats.wallet;
        newWallet = stats.wallet + delta;

        if (currentWallet == 0) {
            // broke, can't lose more money
            chosenEffect = "You would have lost credits but you're already broke!";
        } else if (newWallet <= 0) {
            // now you're broke
            stats.wallet = 0;
            chosenEffect =  "Oh no, now you're broke!";
        } else {
            stats.wallet += delta;
            chosenEffect = '' + delta + ' Credits';
        }
    }
}

function loseRandomGoods() {
    currentGoods = $.grep(stats.menu, function(item) {
        if (item.currentLoot > 0) {
            return true;
        } else { return false; }
    });

    if (currentGoods.length == 0) {
        chosenEffect = 'Luckily our cargo hold was empty, so no loss!';
    } else {
        // get the index of a random item from the list of owned items
        randomIndex = getRandomNumber(0, currentGoods.length - 1);
        // pick a random amount of that item, within current owned amount
        randomAmount = getRandomNumber(1, currentGoods[randomIndex].currentLoot);
        // subtract random amount from currentLoot
        currentAmount = currentGoods[randomIndex].currentLoot;
        chosenEffect = 'Lost ' + randomAmount + ' ' + currentGoods[randomIndex].title;
        currentGoods[randomIndex].currentLoot -= randomAmount;
    }

}

function gainRandomGoods() {
    currentCargo = stats.cargoLoot;

    if (currentCargo == stats.cargoCap) {
        chosenEffect = "Cargo is full! We had to leave the loot behind.";
    } else {
        cargoRoom = stats.cargoCap - currentCargo;// remaining cargo space
        randomAmount = getRandomNumber(1, cargoRoom - 1);
        availableGoods = stats.menu;
        randomIndex = getRandomNumber(0, stats.menu.length - 1);
        // add randomAmount to currentLoot for random item
        availableGoods[randomIndex].currentLoot += randomAmount;

    }
}

function cargoCapIncrease(delta) {
    stats.cargoCap += delta;
}

//// debug / help stuff ////
// show debug panel
$('#help').bind('click', function() {
    showAlert('SpaceTrade - Help', 'Hover over elements to learn more about them. On mobile devices, tap and hold (long press).');
});
$('#debug').bind('click', function() {
	$('#debugPanel').toggle();
});
// bind increase/decrease buttons to stat object
$('#debugPanel button').bind('click', function() {
  parentRow = $(this).closest('tr');
  parentStat = parentRow.attr('class');
  statIncrement = parseInt(parentRow.attr('data-increment'));
  
  if ($(this).hasClass('increase')) {
  	// raise
  	stats[parentStat] += statIncrement;
  } else {
  	// lower
  	if ((stats[parentStat] -= statIncrement) <= 0) {
  		// make sure there are no negative numbers
  		stats[parentStat] = 0;
  	} else {
  		stats[parentStat] -= statIncrement;
  	}
  }
});