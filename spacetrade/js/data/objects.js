// stock base prices and props
var menuA = [];

// sample menu item
////////////////////
//menuA[i] = { title : name of item,
//             safetitle : no caps, hyphenated version of title,
//             loot : user's starting amount of item,
//             unit : increment the item is sold in (currently unused),
//             baseStock : the average amount that a port usually has in stock,
//             currentStock : placeholder to track stock while in port,
//             currentLoot : placeholder to track user loot while in port,
//             basePrice : the average price of the good in each port,
//             currentPrics : placeholder to track "fluxed" price while in port,
//             stockFlux : the amount that the item stock fluctuates at each port, on average,
//             delta : placeholder to track the exhanged amount while in port
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
//            fuelStation : do they sell fuel (true/false),
//            fuelPrice : price of fuel (0 if they don't sell it),
//            fuelAvailable : starting stock of fuel (0 if they don't sell it),
//            fuelDelta : placeholder to track exchanged fuel while in port,
//            cargoUpgradeDelta : placeholder to track purhased upgrades while in port,
//            cargoUpgrade : can you upgrade cargo here (true/false),
//            cargoUpgrades : how many times can you upgrade (20 per upgrade, for now),
//            cargoUpgradePrice : cost to upgrade, 0 if no upgrade station,
//            embargo : list of items port does not buy/sell,
//            priceFlux : amount that prices will fluctuate up/down on average,
//            saleMod : percentage of an items price that will be subtracted during a sale,
//            peakMod : amount an items price will be multiplied by during a hike,
//            description : the white text seen on hover in the marketplace
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
            description : "Earth! Home sweet home, the most stable marketplace in the galaxy.",
            mapOrder : 0
         };

mapA[1] = {  title : "Triton",
            fuelStation : false,
            fuelPrice : 0,
            fuelAvailable : 0,
            fuelDelta : 0,
            cargoUpgradeDelta : 0,
            cargoUpgrade: false,
            cargoUpgrades : 0,
            cargoUpgradePrice : 0,
            embargo : false,
            priceFlux : .7,
            saleMod : .3,
            peakMod : 8,
            description : "This moon of Neptune has a rest stop which has become a popular waypoint for space truckers, probably due to the always-open always-rotating diner.",
            mapOrder : 1
         };

mapA[2] = {  title : "Indus Beta",
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
            description : "Indus Beta, home to Ipizak's Emporium. You don't want to go down here without a security detail, or at least a very big phaser rifle. Decent prices, though.",
            mapOrder : 2
         };

mapA[3] = {  title : "Murdock",
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
            description : "Murdock is a barren, sandy world that relies on imported goods for survival. They have a healthy commercial hub and engineers capable of upgrading cargo holds beyond their normal capacity.",
            mapOrder : 3
         };

mapA[4] = {  title : "Noveria",
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
            description : "Noveria is an elite pleasure planet that hosts rich and famous citizens from all over the galaxy. It has one of busiest spaceports around and a convenient fueling station in high orbit.",
            mapOrder : 4
         };

mapA[5] = {  title : "Zarkon",
            fuelStation : false,
            fuelPrice : 0,
            fuelAvailable : 0,
            fuelDelta : 0,
            cargoUpgradeDelta : 0,
            cargoUpgrade: false,
            cargoUpgrades : 0,
            cargoUpgradePrice : 0,
            embargo : false,
            priceFlux : .5,
            saleMod : .6,
            peakMod : 3,
            description : "Zarkon has a fairly stable economy, and is notable for its continued use of UHF signals despite other extremely advanced technology.",
            mapOrder : 5
         };

mapA[6] = {  title : "Denklathu",
            fuelStation : false,
            fuelPrice : 0,
            fuelAvailable : 0,
            fuelDelta : 0,
            cargoUpgradeDelta : 0,
            cargoUpgrade: false,
            cargoUpgrades : 0,
            cargoUpgradePrice : 0,
            embargo : false,
            priceFlux : .1,
            saleMod : .1,
            peakMod : 9,
            description : "Home to three space-faring insectoid races, Denklathu is all but poisonous to non-native life. High above the planet sits the Denklathu Bazaar, where goods are exchanged and ships are refueled while massive bug-on-bug wars rage far below.",
            mapOrder : 6
         };

mapA[7] = {  title : "Colonia",
            fuelStation : true,
            fuelPrice : 600,
            fuelAvailable : 5,
            fuelDelta : 0,
            cargoUpgradeDelta : 0,
            cargoUpgrade: false,
            cargoUpgrades : 0,
            cargoUpgradePrice : 0,
            embargo : false,
            priceFlux : .4,
            saleMod : .3,
            peakMod : 2,
            description : "A backwater outpost dedicated to producing coffee mugs that say \"I'm lost\" in every known language. At least they sell fuel.",
            mapOrder : 7
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