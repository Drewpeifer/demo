// marketplace Vue app, watches menu objects for changes
// and fires events to the main app / stats objects
Vue.component('marketplace', {
    template: '<ul>' +
                '<li class="market-header unselectable"><span class="title">Commodity</span>' +
                    '<span class="action"></span>' +
                    '<span class="num price"><span class="fa fa-comments-dollar"></span></span>' +
                    '<span class="num stock"><span class="fa fa-cubes"></span></span>' +
                    '<span class="num loot"><span class="fa fa-boxes"></span></span>' +
                '</li>' +
                '<li v-if="mainStats.port.fuelStation" class="unselectable">' +
                    '<span title="This is what lets you travel, and if you run out it\'s Game Over, man!" class="tooltip title">Fuel</span>' +
                    '<span class="action">' +
                    '<input type="range" v-model="mainStats.port.fuelDelta" value="0" v-bind:max="mainStats.port.fuelAvailable" v-bind:min="0">' +
                    '</span>' +
                    '<span class="counter"><button disabled="true">{{ mainStats.port.fuelDelta }}</button></span>' +
                    '<span class="exchange"><button v-on:click="buyFuel(mainStats.port.fuelDelta, mainStats)" v-bind:class="exchangeText(mainStats.port.fuelDelta)">{{ exchangeText(mainStats.port.fuelDelta) }}</button></span>' +
                    '<span class="num">{{ mainStats.port.fuelPrice }}</span>' +
                    '<span class="num">{{ mainStats.port.fuelAvailable }}</span>' +
                    '<span class="num">{{ mainStats.fuel }}</span>' +
                '</li>' +
                '<li v-if="mainStats.port.cargoUpgrade" class="unselectable">' +
                    '<span title="Purchase a cargo upgrade here to increase your ship\'s capacity by 20 units" class="tooltip title">Cargo Hold Upgrade</span>' +
                    '<span class="action">' +
                    '<input type="range" v-model="mainStats.port.cargoUpgradeDelta" value="0" v-bind:max="mainStats.port.cargoUpgrades" v-bind:min="0">' +
                    '</span>' +
                    '<span class="counter"><button disabled="true">{{ mainStats.port.cargoUpgradeDelta }}</button></span>' +
                    '<span class="exchange"><button v-on:click="upgradeCargo(mainStats.port.cargoUpgradeDelta, mainStats)" v-bind:class="exchangeText(mainStats.port.cargoUpgradeDelta)">{{ exchangeText(mainStats.port.cargoUpgradeDelta) }}</button></span>' +
                    '<span class="num">{{ mainStats.port.cargoUpgradePrice }}</span>' +
                    '<span class="num">{{ mainStats.port.cargoUpgrades }}</span>' +
                    '<span class="num">{{ mainStats.cargoUpgrades }}</span></li>' +
                '<li v-for="(item, index) in mainStats.menu" v-bind:class="item.safeTitle">' +
                    '<span v-bind:title="item.description" class="title tooltip unselectable">{{ item.title }}</span>' +
                    '<span class="action">' +
                    '<input type="range" v-model="item.delta" value="0" v-bind:max="item.currentStock" v-bind:min="0 - item.currentLoot">' +
                    '</span>' +
                    '<span class="counter"><button disabled="true">{{ item.delta }}</button></span>' +
                    '<span class="exchange"><button v-on:click="buySell(item, mainStats)" v-bind:class="exchangeText(item.delta)">{{ exchangeText(item.delta) }}</button></span>' +
                    '<span class="num unselectable">{{ item.currentPrice }}</span>' +
                    '<span class="num unselectable">{{ item.currentStock }}</span>' +
                    '<span class="num unselectable">{{ item.currentLoot }}</span>' +
                '</li>' +
            '</ul>',
    methods: {
        exchangeText(delta) {
            if (delta > 0) return "Buy"
            if (delta < 0) return "Sell"
            return "..."
        },
        buySell(item, mainStats) {
            // test for purchase VS sale
            if (parseFloat(item.delta) > 0){// purchase
                if ((parseFloat(item.delta) * parseFloat(item.currentPrice)) > parseFloat(mainStats.wallet)) {// check wallet first
                    // too poor
                    showAlert("Oh, no!", "You're too poor");
                } else if ((parseFloat(item.delta) + parseFloat(cargoSum(mainStats.menu))) > parseFloat(mainStats.cargoCap)) {// then check cargo
                    // cargo full
                    showAlert("Oh, no!", "Your cargo hold can't hold all that cargo");
                } else {// purchase goods
                    // subtract cost from wallet
                    mainStats.wallet = parseFloat(mainStats.wallet) - (parseFloat(item.delta) * parseFloat(item.currentPrice));
                    // increment currentLoot value for that item
                    item.currentLoot = parseFloat(item.delta) + parseFloat(item.currentLoot);
                    // subtract loot from merchant stock
                    item.currentStock = parseFloat(item.currentStock) - parseFloat(item.delta);
                    // reset delta value
                    item.delta = 0;
                }
            } else if (parseFloat(item.delta) < 0) {// sale
                // keep in mind delta is negative in this case
                // add cash to wallet
                mainStats.wallet = parseFloat(mainStats.wallet) - (parseFloat(item.delta) * parseFloat(item.currentPrice));
                // remove loot from item's currentLoot
                item.currentLoot = (parseFloat(item.currentLoot) + parseFloat(item.delta));
                // add loot to item's currentStock
                item.currentStock = (parseFloat(item.currentStock) - parseFloat(item.delta));
                // reset delta value
                item.delta = 0;
            } else {// item.delta is 0
                // do nothing
            }

            updateScore();
        },
        buyFuel(delta, mainStats) {
            // check wallet first
            if ((parseFloat(delta) * parseFloat(mainStats.port.fuelPrice)) > parseFloat(mainStats.wallet)) {// check wallet first
                // too poor
                showAlert("Oh, no!", "You're too poor");
            } else {// buy fuel
                // remove cash from wallet
                mainStats.wallet = parseFloat(mainStats.wallet) - (parseFloat(delta) * parseFloat(mainStats.port.fuelPrice));
                // add fuel to tank
                mainStats.fuel = parseFloat(mainStats.fuel) + parseFloat(delta);
                // remove fuel from station
                mainStats.port.fuelAvailable = parseFloat(mainStats.port.fuelAvailable) - parseFloat(delta);
                // reset delta
                mainStats.port.fuelDelta = 0;
            }

            updateScore();
        },
        upgradeCargo(delta, mainStats) {
            // check wallet first
            if ((parseFloat(delta) * parseFloat(mainStats.port.cargoUpgradePrice)) > parseFloat(mainStats.wallet)) {// check wallet first
                // too poor
                showAlert("Oh, no!", "You're too poor");
            } else if (mainStats.port.cargoUpgrades == 0) {
                showAlert("Oh, no!", "No more upgrades available here")
            } else {// upgrade cargo (add 20 to cargoCap)
                // remove cash from wallet
                mainStats.wallet = parseFloat(mainStats.wallet) - (parseFloat(delta) * parseFloat(mainStats.port.cargoUpgradePrice));
                // add delta * 20 to cargo capacity
                mainStats.cargoCap = parseFloat(mainStats.cargoCap) + (20 * parseFloat(delta));
                // remove delta from available upgrades
                mainStats.port.cargoUpgrades = parseFloat(mainStats.port.cargoUpgrades) - parseFloat(delta);
                // increment main upgrades stats
                mainStats.cargoUpgrades += parseFloat(delta)
                // reset delta
                mainStats.port.cargoUpgradeDelta = 0;
            }
            updateScore();
        }
    },
    data() {
        return {
            mainStats: stats
        }
    }
});

// incident Vue component, shows current incident if one is occurring
Vue.component('incident-list', {
    template: '<ul>' +
        '<li class="header"><p>INCOMING ALERT:</p>' +
        '<p>{{ mainStats.currentIncident.type }}</p></li>' +
        '<li class="description"><p>{{ mainStats.currentIncident.description }} ' +
        '{{ mainStats.currentIncident.alternatives[0] }}</p></li>' +
        '<li class="choices">' +
            '<button v-on:click="makeChoice(0, mainStats)">{{ mainStats.currentIncident.choices[0] }}</button>' +
            '<button v-on:click="makeChoice(1, mainStats)">{{ mainStats.currentIncident.choices[1] }}</button>' +
            '<button v-on:click="makeChoice(2, mainStats)">{{ mainStats.currentIncident.choices[2] }}</button>' +
        '</li>' +
        '<li class="outcome-description" style="display:none;">' +
        '</li></ul>',
    data() {
        return {
            mainStats: stats
        }
    },
    methods : {
        makeChoice(index, mainStats) {
            // dynamically building outcome
            outcome = mainStats.currentIncident.outcomes[index];
            chosenDescription = outcome.description;
            chosenType = outcome.type;
            chosenEffect = outcome.effect;
            chosenFunc = outcome.func;
            choiceButtons = $('li.choices button');
            chosenButton = $(choiceButtons[index]);
            otherButtons = chosenButton.siblings();

            // call outcome func here
            chosenFunc();
            // disable unused choice buttons, and chosen button
            chosenButton.attr('disabled','true')
                        .addClass('disabled-good');
            otherButtons.attr('disabled','true')
                        .addClass('disabled-bad');

            switch(chosenType) {
                case 'good':
                    chosenConfirm ="Cool";
                    break;
                case 'neutral':
                    chosenConfirm = "Meh";
                    break;
                case 'bad':
                    chosenConfirm = "Crap";
                    break;
                default:
                    chosenConfirm = "OK";
            }
            // append outcome to incident peripheral
            $('li.outcome-description').append('<p>' + chosenDescription + '</p>' +
                '<p class="' + chosenType + '">' + chosenEffect + '</p>' +
                '<button id="chosen-outcome">' + chosenConfirm + '</button>').show();

            // bind close button to hide incident peripheral
            $('#chosen-outcome').bind('click change', closeIncident);
            // scroll to outcome
            $('#incident').animate({
                scrollTop: $(".outcome-description").offset().top
            }, 1000);

            // disable the current event
            stats.currentIncident.isHappening = false;
            // incrememt the incident counter
            stats.encounteredIncidents += 1;

        },
        fuelChange(delta) {
            // fuel delta (change) is passed as pos or neg int
            if (delta > 0) {
                stats.fuel += delta;
            } else {
                stats.fuel -= delta;
            }
            updateScore();
        }
    }
});

// map Vue component, builds travel interface from map[X] object
Vue.component('map-list', {
    template: '<ul>' +
                    '<li v-on:click="toggleMap" class="close">[X] Close Map</li>' +
                    '<li v-for="item in mainStats.map">' +
                        '<span v-on:click="travel(item)" v-bind:data="item.title" class="title">{{ item.title }}' +
                            '<span v-if="Math.abs(mainStats.port.mapOrder - item.mapOrder) > 0" class="fa fa-gas-pump"> -{{ Math.abs(mainStats.port.mapOrder - item.mapOrder) }}</span></span>' +
                        '<span class="description">{{ item.description }}</span>' +
                '</li></ul>',
    methods: {
        toggleMap: function() {
            allPortLabels = $('#map ul li span.title');
            currentPortLabel = $('#map ul li span.title[data="' + stats.port.title + '"]');
            allPortLabels.removeClass('current');
            currentPortLabel.addClass('current');
            $('#map').toggle();
        },
        travel: function(port) {
            var travelCost = Math.abs(stats.port.mapOrder - port.mapOrder);
            if (stats.port == port) {
                // can't travel from a port to itself
                showAlert('You\'re already at ' + stats.port.title, 'Captain, have you been drinking?');
            } else if (travelCost > stats.fuel) {
                // can't travel to a destination further than your urrent fuel allows
                showAlert('Not enough fuel for the trip!', 'Try to find a fuel station within range.');
            } else if (stats.fuel >= 1) {
                // you have enough fuel to travel
                stats.port = port;
                buildMarket(port);
                stats.fuel -= travelCost;
                stats.turn += 1;
                allPortLabels = $('#map ul li span.title');
                currentPortLabel = $('#map ul li span.title[data="' + stats.port.title + '"]');
                allPortLabels.removeClass('current');
                currentPortLabel.addClass('current');
                $('#map').toggle();

                // did an incident occur?
                incidentOccurred = getRandomNumber(1, 2);// 1 = yes, 2 = no DEBUG

                if (incidentOccurred == 1) {
                    // incident occurred!
                    // create new list of incidents that haven't occurred yet
                    unknownIncidents = $.map(stats.availableIncidents, function(incident) {
                        if (incident.hasHappened) {
                            // do nothing
                        } else {
                            return incident;
                        }
                    });

                    if (unknownIncidents.length == 0) {
                        // do nothing, no more incidents
                        console.log('no more incidents!');
                    } else {
                        eventIndex = getRandomNumber(0, (unknownIncidents.length - 1));// pick an unknown event
                        stats.currentIncident = unknownIncidents[eventIndex];// set it to current DEBUG
                        stats.currentIncident.isHappening = true;// make it happen, cap'n
                        stats.currentIncident.hasHappened = true;// exclude it from happening again
                        $('#incident').show();// show the incident peripheral
                    }

                } else {
                    // nothing happened
                    updateScore();
                    gameOverCheck();
                }
            } else {
                updateScore();
                gameOverCheck();
            }
        }
    },
    data() {
        return {
            mainStats: stats
        }
    }
});

// high score Vue component, pulls top scores and 3 high scores
// from cookie if they exist, and adds themto Home screen (toggled off)
Vue.component('high-scores', {
    template: '<ul id="scores">' +
              '<li v-show="checkForCookie(\'topScore\')"><p>TOP SCORE: {{ cookie.topScore }}</p></li>' +
              '<li v-show="checkForCookie(\'topCaptain\')"><p>Capt. {{ cookie.topCaptain }}, {{ cookie.topTurns }} Turns</p></li>' +
              '<li v-show="checkForCookie(\'highScore1\')" class="toggle"><p>1. {{ cookie.highScore1 }}</p></li>' +
              '<li v-show="checkForCookie(\'highScore1\')" class="toggle"><p>Capt. {{ cookie.highScore1Captain }}, {{ cookie.highScore1Turns }} Turns</p></li>' +
              '<li v-show="checkForCookie(\'highScore2\')" class="toggle"><p>2. {{ cookie.highScore2 }}</p></li>' +
              '<li v-show="checkForCookie(\'highScore2\')" class="toggle"><p>Capt. {{ cookie.highScore2Captain }}, {{ cookie.highScore2Turns }} Turns</p></li>' +
              '<li v-show="checkForCookie(\'highScore3\')" class="toggle"><p>3. {{ cookie.highScore3 }}</p></li>' +
              '<li v-show="checkForCookie(\'highScore3\')" class="toggle"><p>Capt. {{ cookie.highScore3Captain }}, {{ cookie.highScore3Turns }} Turns</p></li>' +
              '</ul>',
    methods: {
        checkForCookie: function(cookieName) {
            console.log('running checkForCookie for ' + cookieName);
            cookie = convertCookiesToObject(document.cookie);
            return cookie.hasOwnProperty('' + cookieName + '');
        }
    },
    data() {
        return {
            cookie: convertCookiesToObject(document.cookie)
        }
    }
});

// main Vue app, wraps market component
var app = new Vue({
		el: '#app',
		data: stats,
        methods: {
            toggleMap: function() {
                $('#map').toggle();
            },
            currentCargoSum: function(menu) { return cargoSum(menu); },
            currentCargoValueSum: function(menu) { return cargoValueSum(menu); }
        }
});