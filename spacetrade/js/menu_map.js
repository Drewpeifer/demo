// stock base prices and props
var menu = [];

// sample menu item
////////////////////
//menu[i] = { title : name of item,
//            loot : user's starting amount of item,
//            unit : increment the item is sold in (currently unused),
//            baseStock : the average amount that a port usually has in stock,
//            basePrice : the average price of the good in each port,
//            stockFlux : the amount that the item stock fluctuates at each port, on average
//}

menu[0] = { title : "Meteorite Ore",
            loot : 0,
            unit : "ton",
            baseStock : 15,
            basePrice : 20,
            stockFlux : .1 };

menu[1] = { title : "Dilithium Crystals",
            loot : 0,
            unit : "kilo",
            baseStock : 20,
            basePrice : 50,
            stockFlux : .2 };

menu[2] = { title : "Gravitonium",
            loot : 0,
            unit : "kilo",
            baseStock : 20,
            basePrice : 100,
            stockFlux : .3 };

menu[3] = { title : "Laudinum",
            loot : 0,
            unit : "bar",
            baseStock : 10,
            basePrice : 250,
            stockFlux : .4 };

menu[4] = { title : "Unobtainium",
            loot : 0,
            unit : "item",
            baseStock : 0,
            basePrice : 8000,
            stockFlux : 0 };

// locations
var map = [];

// sample map location
///////////////////////
//map[i] = {  title : location name,
//            fuelStation : do they sell fuel true/falsem
//            fuelPrice : price of fuel (0 if they don't sell it),
//            fuelAvailable : starting stock of fuel,
//            cargoUpgrade : can you upgrade cargo here true/false,
//            cargoUpgrades : how many times can you upgrade (20 per upgrade for now),
//            cargoUpgradePrice : cost to upgrade, 0 if no upgrade station,
//            embargo : list of items port does not buy/sell (unused for now),
//            priceFlux : amount that prices will fluctuate up/down on average,
//            saleMod : percentage of an items price that will be subtracted dring a sale,
//            peakMod : amount an items price will be multiplied by during a hike,
//            description : the white text below a locations name, above the marketplace
//         };


map[0] = {  title : "Earth",
            fuelStation : true,
            fuelPrice : 400,
            fuelAvailable : 4,
            cargoUpgrade : false,
            cargoUpgrades : 0,
            cargoUpgradePrice : 0,
            embargo : false,
            priceFlux : .1,
            saleMod : .9,
            peakMod : 2,
            description : "Earth! Home sweet home, the most stable marketplace in the galaxy. You can buy fuel here, or a cheeseburger."
         };

map[1] = {  title : "Rilos",
            fuelStation : false,
            fuelPrice : 0,
            fuelAvailable : 0,
            cargoUpgrade : false,
            cargoUpgrades : 0,
            cargoUpgradePrice : 0,
            embargo : menu[1],
            priceFlux : .2,
            saleMod : .5,
            peakMod : 6,
            description : "Rilos, HQ for the Star League, which defends the Frontier from Xur and the Kodan Armada. We have a free pass for the Frontier, in case you were wondering."
         };

map[2] = {  title : "Arrakis",
            fuelStation : false,
            fuelPrice : 0,
            fuelAvailable : 0,
            cargoUpgrade : true,
            cargoUpgrades : 3,
            cargoUpgradePrice : 2000,
            embargo : menu[2],
            priceFlux : .4,
            saleMod : .7,
            peakMod : 9,
            description : "Arrakis, also known as Dune, home to the spice Melange and also giant worms. Their engineers are awesome at upgrading cargo holds."
         };

map[3] = {  title : "Risa",
            fuelStation : true,
            fuelPrice : 600,
            fuelAvailable : 10,
            cargoUpgrade : false,
            cargoUpgrades : 0,
            cargoUpgradePrice : 0,
            embargo : menu[3],
            priceFlux : .3,
            saleMod : .4,
            peakMod : 8,
            description : "Risa, known throughout the Alpha Quadrant for its recreational attractions and open-minded populace. Seriously. Open-minded. Oh, they sell fuel, too."
         };