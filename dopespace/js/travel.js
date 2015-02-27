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
    $('.alert').append('<p class="alert-outcome">' +
        incident.outcomes[index] + '</p>');
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
        //showAlert('Out of fuel!', 'You\'re stuck, unless your current port has fuel to sell. And you have some money, right?');

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

        randomIncident();// arrival event occurs (or not)

        evalLootStockCargo();// check new location's stock levels
    }
}