// Arrival Events
//////////////////
function randomIncident() {
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
    $.each(rewards, function(index, value) {
        $('.button.alert-action[data-index="' + index + '"]').bind('click', incident.rewards[index]
        );
    });
}
// called after choice button is clicked, before alert is closed by user
function showOutcome(index) {
    clickedButton = $('.alert-action.button[data-index=' + index + ']');
    $('.alert-content').append('<p class="alert-outcome">' + incident.outcomes[index] + '</p>');
    clickedButton.addClass('clicked')
                 .unbind()
                 .siblings()
                 .addClass('unclicked')
                 .unbind();
    $('.alert-content').append("<div id='awesome' class='button alert-action'><p>AWESOME!</p></div>");
    $('#awesome').on('click', function() {
        $('.alert').fadeOut(500);
    });
}
function showEffect(effect) {
    $('.alert-outcome').append(effect);
}
function fuelAlert(text) {
    $('.header .dialog').append('<p class="fuel-alert">' + text + '</p>');
}

// END ARRIVAL EVENTS
////////////////////////


// travelling between locations
function travel() {
    fuelTank = $('.fuel p'),// fuel label container
    fuel = parseInt(fuelTank.text()),// current fuel value
    portTitle = $('.location p'),// port label container
    portDescription = $('.header .dialog p'),// port description container
    nextPort = $(this).attr('id'),// clicked location
    port = map.filter(function (location) {
        // find the corresponding JS map location obj
        return location.title == nextPort;
    });

    console.log('port fuelStation = ' + port[0].fuelStation);

    if (fuel == 0) {
        showAlert('Out of fuel!', 'You\'re stuck, unless your current port has fuel to sell. And you have some money, right?');
        $('.map').slideUp();
        $('.alert-content').append("<div id='uh-oh' class='button alert-action'><p>Uh-oh</p></div>");
        $('#uh-oh').on('click', function() {
            $('.alert').fadeOut(500);
        });
    } else if (portTitle.text() === nextPort) {
        showAlert('Ah, you\'re already at that location', 'Captain, have you been drinking?');
        $('.alert-content').append("<div id='sorry' class='button alert-action'><p>Sorry</p></div>");
        $('#sorry').on('click', function() {
            $('.alert').fadeOut(500);
        });
    } else {
        newFuel = fuel -= 1;// subtract fuel
        fuelTank.text(newFuel);// set new fuel
        $('.fuel-alert').remove();// remove any fuel alerts that exist already

        if (newFuel == 0) {
            fuelTank.removeClass('valid').addClass('invalid');
            fuelAlert("We're out of fuel, Captain! Hope this port has some for sale.");
        } else if (newFuel == 1) {
            fuelAlert("Almost out of fuel, Captain. Better find a port that has some for sale.");
        } else {
            fuelTank.removeClass('invalid').addClass('valid');
        }

        portTitle.text(port[0].title);// set new currentPort
        portDescription.text(port[0].description);// set new descrip
        stockMarket();// build/rebuild

        $('.buy, .sell').click(buySell);// rebind after market build
        // fuel stations
        $('.fuel-station .buy').unbind()// TODO: this seems hacky
                               .click(buyFuel);// but i like semantics
        // cargo upgrade stations
        $('.cargo-upgrade .buy').unbind()
                               .click(upgradeCargo);
        // hide map
        $('.map').slideUp();

        rando = 2;// by default, there's no event, unless it's a non-game-over scenario
        config.turn = config.turn += 1;
        console.log("turn number " + config.turn);
        if (newFuel == 0) {
            if (!port[0].fuelStation) {
                // game over man!
                gameOverAlert();
            } else {
                // arrival event occurs (or not)
                // with a 30% chance of occurring
                rando = getRandomNumber(1,2)// returns 1 or 2
            }
        }
        if (rando == 1) {// TODO: am I crazy? if you're not caching the odds, does it help to have pool bigger?
            randomIncident();
        } else {
            // no incident occurs
        };

        evalLootStockCargo();// check new location's stock levels
    }
}