$(document).ready(function(){
//	makeManyStars();
    buildMarket(stats.port);// builds initial marketplace
    // tour setup
    var tour = {
        data : [
            { element: '#help', 'tooltip' : 'Welcome to the tour. Use the controls in the top-right corner of the screen to step back (&larr;), step forward (&rarr;), or end the tour.<br /><br />In SpaceVue, you travel from place to place (it\'s that simple).<br /><br />To travel, you need fuel.<br /><br />To get fuel, you need credits.<br /><br />To get credits, you need to buy stuff and sell it for a higher price.<br /><br /><b>Caution: Adventures are <strike>possible</strike> probable.</b>'},
            { element: '#controls', 'tooltip' : 'This is your stats panel, displaying your location, credits, cargo, and fuel'},
            { element: '#mapToggle', 'tooltip' : 'Click here to see the map and travel to new places. Travelling to a new location costs 1 Fuel, and there\'s always a chance something could happen on the way...' },
            { element: '#description', 'tooltip' : 'This is a brief description of your current port. Each port has a different market with unique price fluctuations, sale / hike prices, and (sometimes) special services.'},
            { element: '#wallet', 'tooltip' : 'This is your current stockpile of credits, for buying goods and services.'},
            { element: '#cargo', 'tooltip' : 'This is your current cargo / cargo capacity. When your cargo is full, you can\'t buy anything or be given anything.' },
            { element: '#fuel', 'tooltip' : 'Fuel is what gets you around the galaxy, so make sure you don\'t run out (or the game\'s over!). Each jump costs 1 fuel, and only certain ports have fuel stations.' },
            { element: '#market', 'tooltip' : 'This is the marketplace for your current port. Some ports sell unique items, or have embargos on a certain commodity. Other ports may offer services, such as cargo upgrades.', 'position':'TL' },
            { element: '#help', 'tooltip' : 'That\'s about it for the tour, you\'re own your own now, Captain.<br /><br />Remember: buy low, sell high, and always keep some extra fuel around.<br /><br />The game ends if you:<ul><li>A) run out of fuel without being at a gas station,</li><li>B) run out of fuel (even at a gas station) but have no money or goods to trade, or</li><li>C) you meet your untimely end at the hands of a pirate / alien / wormhole etc.<br /><br />Good luck, thanks for playing, and feel free to click this button at any time to see the tour again.' }
        ],
        buttons: {
            next  : { text : '&rarr;', class : ''},
            prev  : { text : '&larr;', class: '' },
            start : { text : 'Start Tour', class: '' },
            end   : { text : 'End Tour', class: '' }
        },
        tooltipPosition : 'BR',
        autoStart : true,
        useOverlay : true,
        welcomeMessage : "",
        controlsPosition : 'TR',
        controlsCss : {
            'background':'transparent',
            'border':'none',
            'top': '-5px',
            'padding': '0'
        },
        tooltipCss : {
            'background':'rgba(255, 255, 255, .8',
            'border':'none !important',
            'color':'#000'
        }
    }

    $('#help').bind('click', function() {
        $.aSimpleTour(tour);
    });

    showWelcome();

});

function closeIncident() {
    $('li.outcome-description').html('');
    $('#incident').hide();
}
// marketplace Vue app, watches menu objects for changes
// and fires events to the main app / stats objects
Vue.component('marketplace', {
    template: '<ul>' +
                '<li class="market-header"><span class="title">Commodity</span>' +
                    '<span class="action"></span>' +
                    '<span class="num">Price</span>' +
                    '<span class="num">Stock</span>' +
                    '<span class="num">Loot</span>' +
                '</li>' +
                '<li v-if="mainStats.port.fuelStation"><span class="title">Fuel</span>' +
                    '<span class="action">' +
                    '<input type="range" v-model="mainStats.port.fuelDelta" value="0" v-bind:max="mainStats.port.fuelAvailable" v-bind:min="0">' +
                    '</span>' +
                    '<span class="counter"><button disabled="true">{{ mainStats.port.fuelDelta }}</button></span>' +
                    '<span class="exchange"><button v-on:click="buyFuel(mainStats.port.fuelDelta, mainStats)" v-bind:class="exchangeText(mainStats.port.fuelDelta)">{{ exchangeText(mainStats.port.fuelDelta) }}</button></span>' +
                    '<span class="num">{{ mainStats.port.fuelPrice }}</span>' +
                    '<span class="num">{{ mainStats.port.fuelAvailable }}</span>' +
                    '<span class="num">{{ mainStats.fuel }}</span>' +
                '</li>' +
                '<li v-if="mainStats.port.cargoUpgrade"><span class="title">Cargo Hold Upgrade</span>' +
                    '<span class="action">' +
                    '<input type="range" v-model="mainStats.port.cargoUpgradeDelta" value="0" v-bind:max="mainStats.port.cargoUpgrades" v-bind:min="0">' +
                    '</span>' +
                    '<span class="counter"><button disabled="true">{{ mainStats.port.cargoUpgradeDelta }}</button></span>' +
                    '<span class="exchange"><button v-on:click="upgradeCargo(mainStats.port.cargoUpgradeDelta, mainStats)" v-bind:class="exchangeText(mainStats.port.cargoUpgradeDelta)">{{ exchangeText(mainStats.port.cargoUpgradeDelta) }}</button></span>' +
                    '<span class="num">{{ mainStats.port.cargoUpgradePrice }}</span>' +
                    '<span class="num">{{ mainStats.port.cargoUpgrades }}</span>' +
                    '<span class="num">{{ mainStats.cargoUpgrades }}</span></li>' +
                '<li v-for="(item, index) in mainStats.menu" v-bind:class="item.safeTitle">' +
                    '<span class="title">{{ item.title }}</span>' +
                    '<span class="action">' +
                    '<input type="range" v-model="item.delta" value="0" v-bind:max="item.currentStock" v-bind:min="0 - item.currentLoot">' +
                    '</span>' +
                    '<span class="counter"><button disabled="true">{{ item.delta }}</button></span>' +
                    '<span class="exchange"><button v-on:click="buySell(item, mainStats)" v-bind:class="exchangeText(item.delta)">{{ exchangeText(item.delta) }}</button></span>' +
                    '<span class="num">{{ item.currentPrice }}</span>' +
                    '<span class="num">{{ item.currentStock }}</span>' +
                    '<span class="num">{{ item.currentLoot }}</span>' +
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
                    alert("you're too poor");
                } else if ((parseFloat(item.delta) + parseFloat(mainStats.cargoLoot)) > parseFloat(mainStats.cargoCap)) {// then check cargo
                    // cargo full
                    alert("your cargo is full");
                } else {// purchase goods
                    console.log('purchase');
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
        },
        buyFuel(delta, mainStats) {
            // check wallet first
            if ((parseFloat(delta) * parseFloat(mainStats.port.fuelPrice)) > parseFloat(mainStats.wallet)) {// check wallet first
                // too poor
                alert("you're too poor");
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
        },
        upgradeCargo(delta, mainStats) {
            // check wallet first
            if ((parseFloat(delta) * parseFloat(mainStats.port.cargoUpgradePrice)) > parseFloat(mainStats.wallet)) {// check wallet first
                // too poor
                alert("you're too poor");
            } else if (mainStats.port.cargoUpgrades == 0) {
                alert("no more upgrades available here")
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

            // call outcome func here so it can modify chosenVars if it wants to
            chosenFunc();

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

            // disable the current event
            stats.currentIncident.isHappening = false;

        },
        fuelChange(delta) {

            if (delta > 0) {
                stats.fuel += delta;
            } else {
                console.log('delta = ' + delta);
                stats.fuel -= delta;
            }
        }
    }
});

// map Vue component, builds travel interface from map[X] object
Vue.component('map-list', {
    template: '<ul>' +
                    '<li v-on:click="toggleMap" class="close">[X] Close Map</li>' +
                    '<li v-for="item in mainStats.map">' +
                    '<span v-on:click="travel(item)" class="title">{{ item.title }}</span>' +
                    '<span class="description">{{ item.description }}</span>' +
                '</li></ul>',
    methods: {
        toggleMap: function() {
            $('#map').toggle();
        },
        travel: function(port) {
            console.log('traveling to ' + port);
            stats.port = port;
            buildMarket(port);
            stats.fuel -= 1;
            $('#map').toggle();

            // did an incident occur?
            incidentOccurred = 1;// DEBUG getRandomNumber(1, 2);// 1 = yes, 2 = no
            console.log('random incident = ' + incidentOccurred);

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
                    stats.currentIncident = unknownIncidents[eventIndex];// set it to current
                    stats.currentIncident.isHappening = true;// make it happen, cap'n
                    stats.currentIncident.hasHappened = true;// exclude it from happening again
                    $('#incident').show();// show the incident peripheral
                    console.log('incident list length = ' + stats.availableIncidents.length);
                    console.log('unknown list length = ' + unknownIncidents.length);
                }

            } else {
                // nothing happened
                console.log('no incident');
            }
        }
    },
    data() {
        return {
            mainStats: stats
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
            cargoSum: function(menu) {
                        var total = 0;
                        for (var i = 0; i < menu.length; i++) {
                            v = parseFloat(menu[i].currentLoot);
                            total += v;
                        }
                        return total;
                    }
        }
});

// incident functions (called by outcomes of incidents)
function nothingHappened() {
    console.log('nothing happened!');
}

function fuelChange(delta) {
    console.log('fuel change! fuel = ' + stats.fuel + ' and delta = ' + delta);

    if (delta > 0) {
        console.log('fuel was ' + stats.fuel);
        stats.fuel += delta;
        console.log('fuel is ' + stats.fuel);
        chosenEffect = '+' + delta + ' fuel';
    } else {
        currentFuel = stats.fuel;

        if (currentFuel == 0) {
            chosenEffect = "You were out of fuel already! No change.";
        } else if ((currentFuel += delta) <= 0) {
            stats.fuel = 0;
            chosenEffect = "Oh no, your tank is empty!";
        } else {
            console.log('fuel was ' + stats.fuel);
            stats.fuel += delta;
            console.log('fuel is ' + stats.fuel);
            chosenEffect = '' + delta + ' fuel';
        }
    }
}

function walletChange(delta) {
    console.log('wallet change! delta = ' + delta);

    if (delta > 0) {
        console.log('wallet was ' + stats.wallet);
        stats.wallet += delta;
        console.log('wallet is ' + stats.wallet);
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
            console.log('wallet was ' + stats.wallet);
            stats.wallet += delta;
            console.log('wallet is ' + stats.wallet);
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

    console.log('currently have ' + currentGoods.length + ' goods');
    console.dir(currentGoods);
    if (currentGoods.length == 0) {
        chosenEffect = 'Luckily our cargo hold was empty, so no loss!';
    } else {
        // get the index of a random item from the list of owned items
        randomIndex = getRandomNumber(0, currentGoods.length - 1);
        console.log(randomIndex);
        // pick a random amount of that item, within current owned amount
        randomAmount = getRandomNumber(1, currentGoods[randomIndex].currentLoot);
        console.log(randomAmount);
        // subtract random amount from currentLoot
        currentAmount = currentGoods[randomIndex].currentLoot;
        console.log('you have ' + currentAmount + ' ' + currentGoods[randomIndex].title + ' and you are losing ' + randomAmount);
        chosenEffect = 'Lost ' + randomAmount + ' ' + currentGoods[randomIndex].title;
        console.log('currentAmount was ' + currentAmount);
        currentGoods[randomIndex].currentLoot -= randomAmount;
        console.log('currentAmount is now ' + currentGoods[randomIndex].currentLoot);
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
    console.log('cargoCap increased from ' + stats.cargoCap + ' to ' + (stats.cargoCap + delta));
}