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
    incident = newIncidents[Math.floor(Math.random()*newIncidents.length)];
    // incident = incidents[0];// DEBUG: uncomment to always return first random incident from list
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
                '<button class="alert-action" ' +
                'data-index="' + index + '" >' +
                value + '</button>'
            );
    });
    // bind each button to corresponding reward function
    $.each(rewards, function(index, value) {
        $('button[data-index="' + index + '"]').bind('click', incident.rewards[index]);
    });
}
// called after choice button is clicked, before alert is closed by user
function showOutcome() {
    $('.alert-content').append('<p class="alert-outcome">' + incident.outcomes[index] + '</p>');
}
function showEffect(effect) {
    $('.alert-outcome').append(effect);
    $('.alert-content button').attr("disabled", "disabled");
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

    if (fuel == 0) {
        // TODO: more subtle fuel alerts
        showAlert('Out of fuel!', 'You\'re stuck, unless your current port has fuel to sell. And you have some money, right?');
        $('.map').slideUp();
    } else if (portTitle.text() === nextPort) {
        showAlert('You\'re already at that location', 'What\'re you, some kind of jokester?');

    } else {
        newFuel = fuel -= 1;// subtract fuel
        fuelTank.text(newFuel);// set new fuel

        if (newFuel <= 1) {
            fuelTank.removeClass('valid').addClass('invalid');
        } else {
            fuelTank.removeClass('invalid').addClass('valid');
        }

        if (newFuel == 1) {// warn pilot if 1 gallon of fuel left
            // TODO: more subtle fuel alerts
            //showAlert('You\'re almost out of fuel!', 'Hope you can reach a fuel station, genius.');
        } else {}

        portTitle.text(port[0].title);// set new currentPort
        portDescription.text(port[0].description);// set new descrip
        stockMarket();// build/rebuild

        $('.buy, .sell').click(buySell);// rebind after market build
        $('.fuel-station .buy').unbind()// TODO: this seems hacky
                               .click(buyFuel);// but i like semantics
        $('.map').slideUp();// hide map

        // arrival event occurs (or not)
        // with a 30% chance of occurring
        rando = getRandomNumber(1,7)
        if (rando == 1 || rando == 3) {// TODO: am I crazy? if you're not caching the odds, does it help to have pool bigger?
            randomIncident();// TODO: this seems like a clumsy way to do this
        } else {
            // no incident occurs
        };

        evalLootStockCargo();// check new location's stock levels
    }
}