// INTERFACE, ACTOR, ITEM, AND OBJECT POSITIONING

// INTERFACE - display elements
console.log('run'),
avatar.offset({ top:10, left:10 }),
prompt.offset({ top:10, left:300 }),
inventory.offset({ top:545, left:10 }),

// ACTORS - characters
player.offset({ top:10, left:10 }),

// ITEMS - things that can go in the inventory
itemAlpha.offset({ top:-103, left:350 }),
itemBravo.offset({ top:100, left:310 }),
itemCharlie.offset({ top:80, left:250 }),
itemDelta.offset({ top:20, left:500 }),

// OBJECTS - interactive non-items
$('.foreground.boxes-left').offset({ top:500, left:0 }),
$('.foreground.boxes-right').offset({ top:500, left:625 }),
terrain.offset({ top:325, left:0 }),
radio.offset({ top:200, left:400 }),
dropspot.offset({ top:400, left:400 });