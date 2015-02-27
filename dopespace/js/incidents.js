// Events that occur randomly when arriving at a new destination
// as part of the travel() function in travel.js
var incidents = [];

// Black Hole encounter
incidents[0] = {
	title : "Captain, we've warped right to a black hole!",
	description : "It's been a while since you've seen any debris around, " +
				  "turns out there's a nearby singularity pulling everything in. " +
				  "A lot of spacers liken black holes to quicksand, some rely on " +
				  "beefy engines and a quick getaway, others swear by a calm, methodical escape.",
	alternatives : [
		"Scanners report a calm event horizon, with minimal radiation signature.",
		"There's something coming out of the center, a faint hum that vibrates the hull.",
		"This singularity has recently consumed a nearby star, we need to steer clear of the plasma circling the event horizon."
	],
	choices : [
		"Kick the throttle and burn some Go Juice! Get us out of here!",
		"Easy, take it slow and give her a wide berth. The less energy we expend, the better.",
		"Let's stay a few minutes and take in the sights. It's probably not that dangerous."
	],
	outcomes : [
		"Whew. Coasted by without incident. Luckily our approach was far enough from the epicenter to give us time to steer away.",
		"Our plasma exhaust has been ignited by an unknown source, we're safely away from the black hole but fuel reserves briefly leaked into space.",
		"Our cargo module was struck by a peice of incoming debris attracted by the singularity. We lost some goods, but we escaped with our lives. Well, Dobson died."
	],
	rewards : [
		function nothingHappened() {// nothing happened
			// print outcome
			index = $(this).attr('data-index');
			showOutcome();
		},
		function lost2Fuel() {// lost 2 fuel
			fuel = parseInt($('.fuel p').text());
			if (fuel <= 2) {
				$('.fuel p').text("0");
			} else {
				newfuel = fuel - 2;
				$('.fuel p').text(newfuel);
			}
			// print outcome
			index = $(this).attr('data-index');
			showOutcome();

		 },
		function lostRandomGoods() {// lost some random goods
			ownedLoot = [];
			// build list of loot that you own
			menu.forEach(function(stock){ 
			    if(stock.loot != 0) {
			        ownedLoot.push(stock);
			    }
			});
			// pick a random item from the list
			randomOwnedLoot = ownedLoot[Math.floor(Math.random()*ownedLoot.length)];
			// find accompanying DOM row
			targetLoot = $('.market td:contains("' + randomOwnedLoot.title + '")').siblings('.loot');
			// recalc value
			newLootVal = parseInt(randomOwnedLoot.loot) / 2;
			// set new loot value on obj
			randomOwnedLoot.loot = newLootVal;
			//set new loot value in DOM
			targetLoot.text(newLootVal);
			// print outcome
			index = $(this).attr('data-index');
			showOutcome();
		}
	],
	hasHappened : false
};

// Strange ship 1 (new civilization encounter)
incidents[1] = {
	title : "Captain, a strange ship is on approach, hailing in an unknown language.",
	description : "Our sensors can't seem to penetrate their hull to analyze their systems, " +
				  "but we can see they have an unknown shield configuration. They seem to be using " +
				  "their engine exhaust to envelope their ship in a plasma shield. Pretty clever,captain.",
	alternatives : [],
	choices : [],
	outcomes : [],
	rewards : [],
	hasHappened : false
};

// Strange ship 2 (allies in distress)
incidents[2] = {
	title : "Sample Incident",
	description : "Description Text (This is what you're going through)",
	alternatives : [],
	choices : [],
	outcomes : [],
	rewards : [],
	hasHappened : false
};

// Strange ship 3 (pirates in disguise)
incidents[3] = {
	title : "Sample Incident",
	description : "Description Text (This is what you're going through)",
	alternatives : [],
	choices : [],
	outcomes : [],
	rewards : [],
	hasHappened : false
};

// Derelict ship 1 (supply ship)
incidents[4] = {
	title : "Sample Incident",
	description : "Description Text (This is what you're going through)",
	alternatives : [],
	choices : [],
	outcomes : [],
	rewards : [],
	hasHappened : false
};

// Derelict ship 2 (evil science ship)
incidents[5] = {
	title : "Sample Incident",
	description : "Description Text (This is what you're going through)",
	alternatives : [],
	choices : [],
	outcomes : [],
	rewards : [],
	hasHappened : false
};

// Asteroid field
incidents[6] = {
	title : "Sample Incident",
	description : "Description Text (This is what you're going through)",
	alternatives : [],
	choices : [],
	outcomes : [],
	rewards : [],
	hasHappened : false
};

// Nebula ahead
incidents[7] = {
	title : "Sample Incident",
	description : "Description Text (This is what you're going through)",
	alternatives : [],
	choices : [],
	outcomes : [],
	rewards : [],
	hasHappened : false
};

// Wormhole spotted
incidents[8] = {
	title : "Sample Incident",
	description : "Description Text (This is what you're going through)",
	alternatives : [],
	choices : [],
	outcomes : [],
	rewards : [],
	hasHappened : false
};

// Beacon found 1 (civilization archive)
incidents[9] = {
	title : "Sample Incident",
	description : "Description Text (This is what you're going through)",
	alternatives : [],
	choices : [],
	outcomes : [],
	rewards : [],
	hasHappened : false
};

// Beacon found 2 (ancient distress signal)
incidents[10] = {
	title : "Sample Incident",
	description : "Description Text (This is what you're going through)",
	alternatives : [],
	choices : [],
	outcomes : [],
	rewards : [],
	hasHappened : false
};