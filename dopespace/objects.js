// objects
///////////

// stock base prices and props
var menu = [];

menu[0] = { title : "Dilithium",
            baseStock : 10,
            basePrice : 500,
            minPrice : 80,
            maxPrice : 1000 };

menu[1] = { title : "Tritanium",
            baseStock : 20,
            basePrice : 200,
            minPrice : 80,
            maxPrice : 1000 };

menu[2] = { title : "Anti-Matter",
            baseStock : 30,
            basePrice : 200,
            minPrice : 80,
            maxPrice : 1000 };

menu[3] = { title : "Laudinum",
            baseStock : 40,
            basePrice : 200,
            minPrice : 80,
            maxPrice : 1000 };

menu[4] = { title : "Plasma",
            baseStock : 50,
            basePrice : 200,
            minPrice : 80,
            maxPrice : 1000 };

// locations
var map = [];

map[0] = {  title : "Earth",
            fuelStation : true,
            embargo : menu[0],
            saleMod : .3 };

map[1] = {  title : "Rilos",
            fuelStation : false,
            embargo : menu[1],
            saleMod : .5 };

map[2] = {  title : "Arrakis",
            fuelStation : false,
            embargo : menu[2],
            saleMod : .7 };

map[3] = {  title : "Risa",
            fuelStation : true,
            embargo : menu[3],
            saleMod : .4 };