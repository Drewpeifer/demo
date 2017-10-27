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
        if ((item.delta * item.price) > mainStats.wallet) {// check wallet first
            // too poor
            console.log('item.delta = ' + item.delta);
            console.log('item.price = ' + item.price);
            console.log('mainStats.wallet = ' + mainStats.wallet);
            alert("you're too poor");
        } else if ((item.delta + mainStats.cargoLoot) > mainStats.cargoCap) {// then check cargo
            // cargo full
            console.log('item.delta = ' + item.delta);
            console.log('mainStats.cargoLoot = ' + mainStats.cargoLoot);
            console.log('mainStats.cargoCap = ' + mainStats.cargoCap);
            alert("your cargo is full");
        } else {// purchase goods
            console.log('purchase');
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
            }
        }
});