// stock base prices and props
var menuA = [];

// sample menu item
////////////////////
//menuA[i] = { title : name of item,
//            loot : user's starting amount of item,
//            unit : increment the item is sold in (currently unused),
//            baseStock : the average amount that a port usually has in stock,
//            basePrice : the average price of the good in each port,
//            stockFlux : the amount that the item stock fluctuates at each port, on average
//}

menuA[0] = { title : "Meteorite Ore",
			safeTitle: "meteorite-ore",
            description : "Cheap, and everywhere, but always handy to have around.",
            loot : 0,
            unit : "ton",
            baseStock : 15,
			currentStock : 0,
			currentLoot : 0,
            basePrice : 20,
			currentPrice : 0,
            stockFlux : .1,
			delta : 0
};
menuA[1] = { title : "Dilithium Crystals",
			safeTitle: "dilithium-crystals",
            description : "Super important for warp reactors. That's about it though.",
            loot : 0,
            unit : "kilo",
            baseStock : 20,
			currentStock : 0,
			currentLoot : 0,
            basePrice : 50,
			currentPrice : 0,
            stockFlux : .2,
			delta : 0
};
menuA[2] = { title : "Gravitonium",
			safeTitle: "gravitonium",
            description : "An unstable element used in reactors and some scary kinds of weapons.",
            loot : 0,
            unit : "kilo",
            baseStock : 20,
			currentStock : 0,
			currentLoot : 0,
            basePrice : 100,
			currentPrice : 0,
            stockFlux : .3,
			delta : 0
};
menuA[3] = { title : "Laudinum",
			safeTitle: "laudinum",
            description : "Used for currency in some places, also as an alloy for electronics.",
            loot : 0,
            unit : "bar",
            baseStock : 10,
			currentStock : 0,
			currentLoot : 0,
            basePrice : 250,
			currentPrice : 0,
            stockFlux : .4,
			delta : 0
};
menuA[4] = { title : "Uranium",
			safeTitle: "uranium",
            description : "Radioactive substance used in fuel and weapons production. Disappointingly, it is not green.",
            loot : 0,
            unit : "item",
            baseStock : 6,
			currentStock : 0,
			currentLoot : 0,
            basePrice : 1000,
			currentPrice : 0,
            stockFlux : .8,
            delta : 0
};
menuA[5] = { title : "Unobtainium",
            safeTitle: "unobtainium",
            description : "Something no one sells, but can sometimes be found randomly in your travels.",
            loot : 0,
            unit : "item",
            baseStock : 0,
            currentStock : 0,
            currentLoot : 0,
            basePrice : 8000,
            currentPrice : 0,
            stockFlux : 0,
            delta : 0
};

// locations
var mapA = [];

// sample map location
///////////////////////
//mapA[i] = {  title : location name,
//            fuelStation : do they sell fuel true/false,
//            fuelPrice : price of fuel (0 if they don't sell it),
//            fuelAvailable : starting stock of fuel,
//            cargoUpgrade : can you upgrade cargo here true/false,
//            cargoUpgrades : how many times can you upgrade (20 per upgrade for now),
//            cargoUpgradePrice : cost to upgrade, 0 if no upgrade station,
//            embargo : list of items port does not buy/sell (unused for now),
//            priceFlux : amount that prices will fluctuate up/down on average,
//            saleMod : percentage of an items price that will be subtracted during a sale,
//            peakMod : amount an items price will be multiplied by during a hike,
//            description : the white text below a locations name, above the marketplace
//         };


mapA[0] = {  title : "Earth",
            fuelStation : true,
            fuelPrice : 400,
            fuelAvailable : 4,
			fuelDelta : 0,
			cargoUpgradeDelta : 0,
            cargoUpgrade : false,
            cargoUpgrades : 0,
            cargoUpgradePrice : 0,
            embargo : false,
            priceFlux : .1,
            saleMod : .9,
            peakMod : 2,
            description : "Earth! Home sweet home, the most stable marketplace in the galaxy. You can buy fuel here, or a cheeseburger."
         };

mapA[1] = {  title : "Rilos",
            fuelStation : false,
            fuelPrice : 0,
            fuelAvailable : 0,
			fuelDelta : 0,
			cargoUpgradeDelta : 0,
            cargoUpgrade: false,
            cargoUpgrades : 0,
            cargoUpgradePrice : 0,
            embargo : menuA[1],
            priceFlux : .2,
            saleMod : .5,
            peakMod : 6,
            description : "Rilos, HQ for the Star League, which defends the Frontier from Xur and the Kodan Armada. We have a free pass for the Frontier, in case you were wondering."
         };

mapA[2] = {  title : "Arrakis",
            fuelStation : false,
            fuelPrice : 0,
            fuelAvailable : 0,
			fuelDelta : 0,
			cargoUpgradeDelta : 0,
            cargoUpgrade: true,
            cargoUpgrades : 3,
            cargoUpgradePrice : 2000,
            embargo : menuA[2],
            priceFlux : .4,
            saleMod : .7,
            peakMod : 9,
            description : "Arrakis, also known as Dune, home to the spice Melange and also giant worms. Their engineers are awesome at upgrading cargo holds."
         };

mapA[3] = {  title : "Risa",
            fuelStation : true,
            fuelPrice : 600,
            fuelAvailable : 10,
			fuelDelta : 0,
			cargoUpgradeDelta : 0,
            cargoUpgrade: false,
            cargoUpgrades : 0,
            cargoUpgradePrice : 0,
            embargo : menuA[3],
            priceFlux : .3,
            saleMod : .4,
            peakMod : 8,
            description : "Risa, known throughout the Alpha Quadrant for its recreational attractions and open-minded populace. Seriously. Open-minded. Oh, they sell fuel, too."
         };

// global config variables for easy debugging
var config = {
    startingTurn : 0,// starts game progression at turn 0
    startingWallet : 3000,// starting cash
    startingFuel : 10,// starting fuel amount
    startingPort : mapA[0],// starting location
    startingLoot : 0,// starting cargoLoot (loot in cargo hold)
    startingCap : 20,// starting cargoCap (max capacity)
    cargoUpgrades : 3// available upgrades (total)
}

// actual player stat, at default
var stats = {
    turn : 0,// always start on turn 0
    wallet : 0,
    fuel : 0,
    port : mapA[0],// always start at Earth
    cargoLoot : 0,// unused
    cargoCap : 0,
    cargoUpgrades : 0,
    cargoValue : 0,// unused
    menu : menuA,
    map : mapA,
    config : config,
    availableIncidents : incidents,
    encounteredIncidents : 0,
    currentIncident : incidents[0],
    score : 0,
    captainName : 'Smith'
}

// set often-debugged values
// TODO: remove config
stats.wallet = config.startingWallet;
stats.fuel = config.startingFuel;
stats.cargoLoot = config.startingLoot;
stats.cargoCap = config.startingCap;