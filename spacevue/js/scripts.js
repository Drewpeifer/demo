$(document).ready(function(){
//	makeManyStars();
    buildMarket(stats.port);// builds initial marketplace
});

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
                    '<span class="action">SLIDER + ACTION</span>' +
                    '<span class="num">{{ mainStats.port.fuelPrice }}</span>' +
                    '<span class="num">{{ mainStats.port.fuelAvailable }}</span>' +
                    '<span class="num">{{ mainStats.fuel }}</span>' +
                '</li>' +
                '<li v-if="mainStats.port.cargoUpgrade"><span class="title">Cargo Hold Upgrade</span>' +
                    '<span class="action">SLIDER + ACTION</span>' +
                    '<span class="num">{{ mainStats.port.cargoUpgradePrice }}</span>' +
                    '<span class="num">{{ mainStats.remainingCargoUpgrades }}</span>' +
                    '<span class="num">{{ (mainStats.config.cargoUpgrades - mainStats.remainingCargoUpgrades) }}</span></li>' +
                '<li v-for="(item, index) in mainStats.menu" v-bind:class="item.safeTitle">' +
                    '<span class="title">{{ item.title }}</span>' +
                    '<span class="counter"><button disabled="true">{{ item.delta }}</button></span>' +
                    '<span class="action">' +
                    '<input type="range" v-model="item.delta" value="0" v-bind:max="item.currentStock" v-bind:min="0 - item.currentLoot">' +
                    '</span>' +
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
                // add loot to cargo hold
                mainStats.cargoLoot = parseFloat(item.delta) + parseFloat(mainStats.cargoLoot);
            }
        } else if (parseFloat(item.delta) < 0) {// sale
            // add cash to wallet
            // remove loot from item's currentLoot
            // remove loot from cargo hold
            // add loot to item's currentStock
        } else {// item.delta is 0
            // do nothing
        }
      }
    },
    data() {
        return {
            mainStats: stats
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
            $('#map').toggle();
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