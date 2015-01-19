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
            saleMod : .3,
            description : "Do you see any Teletubbies in here? Do you see a slender plastic tag clipped to my shirt with my name printed on it? Do you see a little Asian child with a blank expression on his face sitting outside on a mechanical helicopter that shakes when you put quarters in it? No? Well, that's what you see at a toy store. And you must think you're in a toy store, because you're here shopping for an infant named Jeb."};

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