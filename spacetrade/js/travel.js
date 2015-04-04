// Arrival Events
//////////////////
function randomIncident(odds) {
    // DEBUG
    // incident props:
    // title, description, alternatives, choices, outcomes, rewards, hasHappened
    newIncidents = [];
    // loop through incidents, add to newIncidents if they havent happened yet
    $.each(incidents, function(index, value) {
        if (!incidents[index].hasHappened) {
            newIncidents.push(value)
        } else {
            // do nothing
        }
    })

    // pick a random incident from newIncidents
    //incident = newIncidents[0];// DEBUG: uncomment to always return first random incident from list
    incident = newIncidents[Math.floor(Math.random()*newIncidents.length)];
    // pick random alternative text
    console.log("incident = " + incident.title);
    alternative = incident.alternatives[Math.floor(Math.random()*incident.alternatives.length)];
    choices = incident.choices;
    rewards = incident.rewards;
    // concatenate description text
    incidentDescrip = incident.description + " " + alternative;
    // flag this incident as happening right now
    incident.isHappening = true;

    showAlert(incident.title, incidentDescrip);
    // build choice buttons
    $.each(choices, function(index, value) {
        $('.alert-content').append(
                '<div class="button alert-action" ' +
                'data-index="' + index + '" ><p>' +
                value + '</p></div>'
            );
    });

    // bind each button to corresponding reward function
    // here, rewards is the dictionary of key/val pairs,
    // where "keys" are a num matching the index of the choice made,
    // and "value" returns the properties of that reward, i.e. func, type, effect
    // so .button[data-index=i] binds to incident.rewards.i.func
    // and showOutcome displays incident.rewards.i.outcome,
    // showEffect displays incident.rewards.i.type
    $.each(rewards, function(key, value) {
        console.log('rewards loop');
        console.dir($(this));
        console.log("key = " + key);
        console.log("value = " + value);
        console.log(value);
        console.log('value.func');
        console.log(value.func);
        console.log('value.effect');
        console.log(value.effect);
        func = value.func;
        $('.button.alert-action[data-index="' + key + '"]').bind('mouseup', func.bind(this))
            .bind('mouseup', showOutcome.bind(this, key, value));
    });
    $('.button.alert-action').on('mousedown', function() {
        $(this).addClass('clicked');
    });
}
// called after choice button is clicked, before alert is closed by user
function showOutcome(index, reward) {
    console.log("SO index = " + index);
    console.dir(reward);
    outcome = reward.outcome;
    type = reward.type;
    effect = reward.effect;
    console.log("showOutcome start, effect " + effect);
    clickedButton = $('.alert-action.button[data-index=' + index + ']');
    $('.alert-content').append('<p class="alert-outcome">' + outcome + '</p>');
    clickedButton.unbind()
                 .siblings()
                 .addClass('unclicked')
                 .unbind();
    effect = "<b class='incident-outcome " +
                                type + "'>Effect: " +
                                effect + "</b>"
    $('.alert-outcome').append(effect);
    if (type == "bad") {
        $('.alert-content').append("<div id='closeAlert' onclick='closeAlert();' class='button alert-action'><p>Crap</p></div>");
    } else if (type == "neutral") {
        $('.alert-content').append("<div id='closeAlert' onclick='closeAlert();' class='button alert-action'><p>Meh</p></div>");
    } else if (type == "good") {
        $('.alert-content').append("<div id='closeAlert' onclick='closeAlert();' class='button alert-action'><p>AWESOME!</p></div>");
    } else {
        $('.alert-content').append("<div id='closeAlert' onclick='closeAlert();' class='button alert-action'><p>No type!</p></div>");
    }

    // find currently executing incident
    incident = incidents.filter(function( obj ) {
      return obj.isHappening == true;
    });
    // flag incident as in the past
    incident[0].isHappening = false;
    incident[0].hasHappened = true;
    // check new location's stock levels
    evalLootStockCargo();
    console.log('showOutcome end');
}
function fuelAlert(text) {
    $('.header .dialog').append('<p class="fuel-alert">' + text + '</p>');
}

// END ARRIVAL EVENTS
////////////////////////

// GAME PROGRESSION LOGIC
///////////////////////////////
// this function increases the games depth and difficulty
// depending on the amount of turns/travels the user has taken
function advanceProgress() {
// This is pretty clever! Generates a random number between 1-100 (rando)
// and based upon current turn, odds are declared
// by converting the desired odds of occurring (e.g. 30%) into an
// integer from 1-100 (e.g. 30) and checking if rando falls below
// odds. So, rando(1-100) has 30% of being less than 30.
// If true, event occurs.

    thisTurn = config.turn;// number of turns the user has taken
    rando = getRandomNumber(1,100);// pick a random number from 1-100

    function didItHappen(rando, odds) {
        console.log('running didItHappen with odds @ ' + odds + '% and rando = ' + rando);
        if (rando <= odds || odds == 0) {
            return false;
        } else {
            randomIncident();
        }
    }
    function showTierEvent(thisTurn) {
        // special positive events that occur at intervals
        console.log('turn ' + thisTurn + ' reached');
        index = (thisTurn / 10) - 1;
        showAlert(tierEvents[index].title, tierEvents[index].description);
        $('.alert-content').append("<div id='sweet' class='button alert-action' onclick='closeAlert();'><p>Sweet!</p></div>");
        $('#sweet').on('click', closeAlert);
        tierEvents[index].func();
    }

    // what turn is it?
    // block randomIncidents at tiers of ten
    // in favor of tierEvents
    if (thisTurn <= 9) {
        odds = 30;
    } else if (thisTurn == 10) {
        showTierEvent(thisTurn);
        odds = 0;// no event
    } else if (thisTurn <= 19) {
        odds = 40;
    } else if (thisTurn == 20) {
        showTierEvent(thisTurn);
        odds = 0;// no event
    } else if (thisTurn <= 29) {
        odds = 50;
    } else if (thisTurn == 30) {
        showTierEvent(thisTurn);
        odds = 0;// no event
    } else if (thisTurn <= 39) {
        odds = 60;
    } else if (thisTurn == 40) {
        showTierEvent(thisTurn);
        odds = 0;// no event
    } else if (thisTurn <= 49) {
        odds = 70;
    } else if (thisTurn == 50) {
        showTierEvent(thisTurn);
        odds = 0;// no event
    } else if (thisTurn <= 59) {
        odds = 70;
    } else if (thisTurn == 60) {
        showTierEvent(thisTurn);
        odds = 0;// no event
    } else {
        odds = 70;
        // after 60 turns, odds stay at 70% chance
        // until you're out of events
    }

    // did an event happen? if rando <= odds, it did
    didItHappen(rando, odds);
}
// END GAME PROGRESSION LOGIC
///////////////////////////////

// travelling between locations
function travel() {
    fuelTank = $('.fuel p'),// fuel label container
    fuel = parseInt(fuelTank.text()),// current fuel value
    portTitle = $('.location p'),// port label container
    nextPort = $(this).attr('id'),// clicked location
    //TODO: collate maps[] as mapX on turn change
    port = mapA.filter(function (location) {
        // find the corresponding JS map location obj
        return location.title == nextPort;
    });

    if (fuel == 0) {
        // no travel
        showAlert('Out of fuel!', 'You\'re stuck, unless your current port has fuel to sell. And you have some money, right?');
        $('.map').slideUp();
        $('.alert-content').append("<div id='uh-oh' class='button alert-action'><p>Uh-oh</p></div>");
        $('#uh-oh').on('click', closeAlert);
    } else if (portTitle.text() === nextPort) {
        // no travel
        showAlert('Ah, you\'re already at that location', 'Captain, have you been drinking?');
        $('.alert-content').append("<div id='sorry' class='button alert-action' onclick='closeAlert();'><p>Sorry</p></div>");
        $('#sorry').on('click', closeAlert);
    } else {
        // travel successful
        newFuel = fuel -= 1;// subtract fuel
        fuelTank.text(newFuel);// set new fuel
        $('.fuel-alert').remove();// remove any fuel alerts that exist already

        if (newFuel == 0) {
            fuelTank.removeClass('valid').addClass('invalid');
            fuelAlert("We're out of fuel, Captain! Hope this port has some for sale.");
        } else if (newFuel == 1) {
            fuelAlert("Almost out of fuel, Captain. Better find a port that has some for sale.");
        } else {}

        portTitle.text(port[0].title);// set new currentPort
        stockMarket();// build/rebuild
        evalLootStockCargo();// check new location's stock levels

        $('.buy, .sell').click(buySell);// rebind after market build
        // fuel stations
        $('.fuel-station .buy').unbind()// TODO: this seems hacky
                               .click(buyFuel);// but i like semantics
        // cargo upgrade stations
        $('.cargo-upgrade .buy').unbind()
                               .click(upgradeCargo);
        // hide map
        closeAlert();

        config.turn = config.turn += 1;
        console.log("turn number " + config.turn);
        if (newFuel == 0 && !port[0].fuelStation) {
            // game over man!
            gameOverAlert();
        } else {
            advanceProgress();// push the game forward
        }
    }
}