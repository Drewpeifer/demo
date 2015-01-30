// objects
///////////

// stock base prices and props
var menu = [];

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

map[0] = {  title : "Earth",
            fuelStation : true,
            fuelPrice : 1000,
            embargo : menu[0],
            priceFlux : .1,
            saleMod : .9,
            peakMod : 2,
            description : "Earth! Home sweet home, the most stable marketplace in the galaxy."
         };

map[1] = {  title : "Rilos",
            fuelStation : false,
            embargo : menu[1],
            priceFlux : .2,
            saleMod : .5,
            peakMod : 6,
            description : "Rilos, HQ for the Star League, which defends the Frontier from Xur and the Kodan Armada."
         };

map[2] = {  title : "Arrakis",
            fuelStation : false,
            embargo : menu[2],
            priceFlux : .4,
            saleMod : .7,
            peakMod : 9,
            description : "Arrakis, also known as Dune, home to the spice Melange and also giant worms."
         };

map[3] = {  title : "Risa",
            fuelStation : true,
            embargo : menu[3],
            priceFlux : .3,
            saleMod : .4,
            peakMod : 8,
            description : "Risa, known throughout the Alpha Quadrant for its recreational attractions and open-minded populace."
         };

// events
//////////

var events = [];

events[0] = { title : "Something happened!",
              description : "Something crazy happened and you have to make a decision.",
              options : ["Bargain", "Leave"]
            };