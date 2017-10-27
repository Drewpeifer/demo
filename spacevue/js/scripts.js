$(document).ready(function(){
	makeManyStars();
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
                    '<span class="num">{{ (config.cargoUpgrades - stats.remainingCargoUpgrades) }}</span></li>' +
                '<li v-for="item in mainStats.menu" v-bind:class="item.safeTitle">' +
                    '<span class="title">{{ item.title }}</span>' +
                    '<span class="action">SLIDER + ACTION</span>' +
                    '<span class="num">{{ item.currentPrice }}</span>' +
                    '<span class="num">{{ item.currentStock }}</span>' +
                    '<span class="num">{{ item.currentLoot }}</span>' +
                '</li>' +
            '</ul>',
    data() {
        return {
            mainStats: stats
        }
    }
});

// main Vue app, wraps market component
var app = new Vue({
		el: '#app',
		data: stats
});