// Events that occur randomly when arriving at a new destination
// as part of the travel() function in travel.js
var incidents = [];

incidents[0] = {
	title : "Sample Incident",
	description : "Description Text (This is what you're going through)",
	alternatives : [],
	choices : [],
	outcomes : [],
	rewards : [],
	inThePast : false
};

incidents[1] = {
	title : "Black Hole Encountered!",
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
		function() { return false; },// nothing happened
		function() {// lost 2 fuel
			fuel = parseInt($('.fuel p').text());
			if (fuel <= 2) {
				$('.fuel p').text("0");
			} else {
				newfuel = fuel - 2;
				$('.fuel p').text(newfuel);
			}
		 },
		function() {// lost some random goods
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
			return false;
		}
	],
	hasHappened : false
};