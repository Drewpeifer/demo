// objects
///////////

// stock base prices and props
var menu = [];

menu[0] = { title : "Meteorite Ore",
            unit : "ton",
            baseStock : 15,
            basePrice : 20,
            flux : .1 };

menu[1] = { title : "Dilithium Crystals",
            unit : "kilo",
            baseStock : 20,
            basePrice : 50,
            flux : .2 };

menu[2] = { title : "Gravitonium",
            unit : "kilo",
            baseStock : 20,
            basePrice : 100,
            flux : .3 };

menu[3] = { title : "Laudinum",
            unit : "bar",
            baseStock : 10,
            basePrice : 250,
            flux : .4 };

menu[4] = { title : "Unobtainium",
            unit : "item",
            baseStock : 0,
            basePrice : 15000,
            flux : 0 };

// locations
var map = [];

map[0] = {  title : "Earth",
            fuelStation : true,
            embargo : menu[0],
            saleMod : .9,
            peakMod : 2,
            description : "Earth! Home sweet home, the most stable marketplace in the galaxy."
         };

map[1] = {  title : "Rilos",
            fuelStation : false,
            embargo : menu[1],
            saleMod : .5,
            peakMod : 6,
            description : "Rilos, HQ for the Star League, which defends the Frontier from Xur and the Kodan Armada."
         };

map[2] = {  title : "Arrakis",
            fuelStation : false,
            embargo : menu[2],
            saleMod : .7,
            peakMod : 9,
            description : "Arrakis, also known as Dune, home the spice Melange and also giant worms."
         };

map[3] = {  title : "Risa",
            fuelStation : true,
            embargo : menu[3],
            saleMod : .4,
            peakMod : 8,
            description : "Risa, known throughout the Alpha Quadrant for its recreational attractions and open-minded populace."
         };