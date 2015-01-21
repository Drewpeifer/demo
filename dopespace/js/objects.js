// objects
///////////

// stock base prices and props
var menu = [];

menu[0] = { title : "Meteorite Ore",
            baseStock : 10,
            basePrice : 20,
            minPrice : 17,
            maxPrice : 100 };

menu[1] = { title : "Dilithium Crystals",
            baseStock : 20,
            basePrice : 200,
            minPrice : 80,
            maxPrice : 1000 };

menu[2] = { title : "Gravitonium",
            baseStock : 30,
            basePrice : 200,
            minPrice : 80,
            maxPrice : 1000 };

menu[3] = { title : "Laudinum",
            baseStock : 40,
            basePrice : 200,
            minPrice : 80,
            maxPrice : 1000 };

menu[4] = { title : "Unobtainium",
            baseStock : 50,
            basePrice : 200,
            minPrice : 80,
            maxPrice : 1000 };

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