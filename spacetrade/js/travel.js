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
    incident = newIncidents[0];// DEBUG: uncomment to always return first random incident from list
    //incident = newIncidents[Math.floor(Math.random()*newIncidents.length)];
    // pick random alternative text
    alternative = incident.alternatives[Math.floor(Math.random()*incident.alternatives.length)];
    choices = incident.choices;
    rewards = incident.rewards;
    // concatenate description text
    incidentDescrip = incident.description + " " + alternative;
    // flag this incident as having happened
    incident.hasHappened = true;

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
    // showEffect displaysincident.rewards.i.type
    $.each(rewards, function(key, value) {
        func = value.func;
        console.log(key);
        console.log(value);
        console.log(func);
        $('.button.alert-action[data-index="' + key + '"]')
                .on('click', func.bind(this))
                .on('click', showOutcome.bind(this, key));
    });
}
// called after choice button is clicked, before alert is closed by user
function showOutcome(index) {
    console.log("index = " + index);
    outcomeReward = $(this);
    clickedButton = $('.alert-action.button[data-index=' + index + ']');
    $('.alert-content').append('<p class="alert-outcome">' + outcomeReward[0].outcome + '</p>');
    clickedButton.addClass('clicked')
                 .unbind()
                 .siblings()
                 .addClass('unclicked')
                 .unbind();
    effect = "<b class='incident-outcome " +
                                outcomeReward[0].type + "'>Effect: " +
                                outcomeReward[0].effect + "</b>"
    $('.alert-outcome').append(effect);
    if (outcomeReward[0].type == "bad") {
        $('.alert-content').append("<div id='closeAlert' onclick='closeAlert();' class='button alert-action'><p>Crap</p></div>");
    } else if (outcomeReward[0].type == "neutral") {
        $('.alert-content').append("<div id='closeAlert' onclick='closeAlert();' class='button alert-action'><p>Meh</p></div>");
    } else if (outcomeReward[0].type == "good") {
        $('.alert-content').append("<div id='closeAlert' onclick='closeAlert();' class='button alert-action'><p>AWESOME!</p></div>");
    } else {
        $('.alert-content').append("<div id='closeAlert' onclick='closeAlert();' class='button alert-action'><p>No type!</p></div>");
    }
    evalLootStockCargo();// check new location's stock levels
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

    thisTurn = config.turn;// number of turns the user has taken
    rando = getRandomNumber(1,100);// pick a random number from 1-100

    function didItHappen(rando, odds) {
        console.log('running didItHappen with odds @ ' + odds + '% and rando = ' + rando);
        if (rando <= odds) {
            return false;
        } else {
            randomIncident();
        }
    }

    if (thisTurn <= 9) {
        odds = 30;
    } else if (thisTurn == 10) {
        console.log('turn 10 reached');
        odds = 0;// no event
    } else if (thisTurn <= 19) {
        odds = 40;
    } else if (thisTurn == 20) {
        console.log('turn 20 reached');
        odds = 0;// no event
    } else if (thisTurn <= 29) {
        odds = 50;
    } else if (thisTurn == 30) {
        console.log('turn 30 reached');
        odds = 0;// no event
    } else if (thisTurn <= 39) {
        odds = 60;
    } else if (thisTurn == 40) {
        console.log('turn 40 reached');
        odds = 0;// no event
    } else if (thisTurn <= 49) {
        odds = 70;
    } else if (thisTurn == 50) {
        console.log('turn 50 reached');
        odds = 0;// no event
    } else if (thisTurn <= 59) {
        odds = 70;
    } else if (thisTurn == 60) {
        console.log('turn 60 reached');
        odds = 0;// no event
    } else {
        console.log('over 60 turns reached!');
        odds = 70;
    }

    didItHappen(rando,odds);// did an event happen?
}
// END GAME PROGRESSION LOGIC
///////////////////////////////

// travelling between locations
function travel() {
    fuelTank = $('.fuel p'),// fuel label container
    fuel = parseInt(fuelTank.text()),// current fuel value
    portTitle = $('.location p'),// port label container
    portDescription = $('.header .dialog p'),// port description container
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
        $('#uh-oh').on('click', function() {
            $('.alert').fadeOut(500);
        });
    } else if (portTitle.text() === nextPort) {
        // no travel
        showAlert('Ah, you\'re already at that location', 'Captain, have you been drinking?');
        $('.alert-content').append("<div id='sorry' class='button alert-action' onclick='closeAlert();'><p>Sorry</p></div>");
        $('#sorry').on('click', function() {
            $('.alert').fadeOut(500);
        });
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
        portDescription.text(port[0].description);// set new descrip
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