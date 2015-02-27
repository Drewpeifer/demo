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
		// TODO: collect reward functions into separate file, just call them here
		function nothingHappened() {// nothing happened
			// print outcome
			index = $(this).attr('data-index');
			showOutcome();
			showEffect("<b class='incident-outcome neutral'>Effect: None.</b>");
		},
		function lostTwoFuel() {// lost 2 fuel
			fuel = parseInt($('.fuel p').text());
			if (fuel <= 2) {
				$('.fuel p').text("0");
			} else {
				newfuel = fuel - 2;
				$('.fuel p').text(newfuel);
			}
			currentFuel = parseInt($('.fuel p').text());
			// print outcome
			index = $(this).attr('data-index');
			showOutcome();
			showEffect("<b class='incident-outcome bad'>Effect: We lost 2 fuel, we currently have " + currentFuel + " left.</b>");
		 },
		function lostRandomGoods() {// lost some random goods
			ownedLoot = [];
			// build list of loot that you own
			menu.forEach(function(stock){ 
			    if(stock.loot != 0) {
			        ownedLoot.push(stock);
			    }
			});
			console.log(ownedLoot.length);
			if (ownedLoot.length < 1) {
				// print outcome
				index = $(this).attr('data-index');
				showOutcome();
				showEffect("<b class='incident-outcome neutral'>Effect: Dobson's gone (no big loss), and we didn't have any cargo in storage, so we just patched the hull and ejected ol' Dobbie's personal effects into space. That's procedure, right?.</b>");
			} else {
				// pick a random item from the list
				randomOwnedLoot = ownedLoot[Math.floor(Math.random()*ownedLoot.length)];
				// find accompanying DOM row
				targetLoot = $('.market td:contains("' + randomOwnedLoot.title + '")').siblings('.loot');
				targetLootVal = targetLoot.text();
				// recalc value
				newLootVal = parseInt(randomOwnedLoot.loot) / 2;
				// set new loot value on obj
				randomOwnedLoot.loot = newLootVal;
				//set new loot value in DOM
				targetLoot.text(newLootVal);
				// print outcome
				index = $(this).attr('data-index');
				showOutcome();
				showEffect("<b class='incident-outcome bad'>Effect: Dobson's gone (no big loss), and we lost " + parseInt(targetLootVal - newLootVal)  + " of our " + randomOwnedLoot.title + ". It was probably Dobson's fault anyway, so I personally shot all his personal crap out the airlock. He didn't have anything good anyway.</b>");
			}
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
	alternatives : [
		"Maybe we could learn something from them. Science Officer recommends we try to initiate communication via mathematical and visual signals.",
		"Could mean they're more clever than we are. Tactical Officer recommends raising shields and waiting to see how this plays out.",
		"But, if they have shields we haven't seen before, they probably have weapons we haven't seen before, too. I recommend we raise shields and hightail it out of here."
	],
	choices : [
		"Initiate communication on all frequencies, using all methods and dialects in sequence. Let's try to make a friend.",
		"Raise shields and ask them to identify their planet of origin. We don't lower shields or move from this spot until we know who they are and what they're about.",
		"I don't like the looks of this! Raise shields, charge weapons, and fire a warning shot across their bow. If they don't retreat, hit them with a torpedo and make a run for it!"
	],
	outcomes : [
		"They've responded to our musical intonation array! It seems they communicate by singing complex songs that can last up to ten hours. The computer is currently building a dictionary or their language but so far we know they are peaceful, advanced, and happy to meet us. They say our ship can't be fitted with a shield like theirs, but they've graciously refined our current fuel (somehow) to burn twice as efficiently!",
		"They broadcasted for a few minutes longer, Captain, but they seem to be resuming their original course at speeds we cannot match. I'm not sure if our posture was taken as overly offensive or overly defensive, or maybe they just got bored waiting for a reply, but I guess we'll never know who they were.",
		"Captain, our warning shot accidentally hit their shields! They've returned fire and melted our phasers right through our shields! I think they even teleported out torpedos out of their tubes and into space. We can make repairs but it'll take time and cost money; luckily, they seem to be resuming their course at high speed. We've received a message as well, Captain. The computer's translation approximates it to be 'LATER, JERKS'."
	],
	rewards : [
		function fuelDoubled() {// fuel amount is doubled
			index = $(this).attr('data-index');
			fuel = parseInt($('.fuel p').text());
			if (fuel == 0) {
				newFuel = 5;
				$('.fuel p').text(newfuel);		
				showOutcome();		
				showEffect("<b class='incident-outcome good'>Effect: Well, we didn't have any fuel, so they gave us 5 units. Man, they were nice.</b>");
			} else {
				newfuel = fuel * 2;
				$('.fuel p').text(newfuel);
				currentFuel = parseInt($('.fuel p').text());
				showOutcome();
				showEffect("<b class='incident-outcome good'>Effect: Current fuel stores doubled from " + fuel + " to " + currentFuel + "!</b>");
			}
		},
		function nothingHappened() {// nothing happened
			index = $(this).attr('data-index');
			showOutcome();
			showEffect("<b class='incident-outcome neutral'>Effect: None.</b>");
		},
		function lostTenthMoney() {// lose a tenth of current wallet
			index = $(this).attr('data-index'),
			wallet = parseInt($('.wallet p').text()),// get current money
			lostAmount = Math.floor(wallet / 10),// divide by ten
			newWallet = wallet - lostAmount;// subtract a tenth from initial money

			$('.wallet p').text(newWallet);// set new wallet
			showOutcome();
			showEffect("<b class='incident-outcome bad'>Effect: Repairs have been completed but they were expensive, our funds dropped from " + wallet + " to " + newWallet + ".</b>");
		}
	],
	hasHappened : false
};

// Strange ship 2 (allies in distress)
incidents[2] = {
	title : "Captain, there's an unknown vessel approaching, broadcasting a distress signal on all frequencies.",
	description : "They say their engines are malfunctioning, and exhaust plasma has leaked into the ship's engineering section. " +
				  "Scanners show their engines are indeed operating at 10 percent efficiency, and their life support systems are overloading " +
				  "one by one, radiating out from the engineering section. Their weapons are offline and their shields are down, they " +
				  "may be diverting power to life support but the damage may have affected those systems as well.",
	alternatives : [
		"We may be the only ship within range that can help, and judging by their ship registration, they are a private transport ship for a local planetary government. Too small to carry anyone important, probably just shuttling bureaucrats from system to system.",
		"That radiation may affect our systems if we attempt to dock or approach too close. Their engines may also overload at any time, and the resulting explosion would severly damage our ship if we were within docking range. I recommend assisting in any way we can, from a healthy distance. If necessary, we can evacuate their personnel.",
		"Keep in mind, some pirates use this same type of scenario to lure in repair vessels, then rob them blind and sometimes even kill the crew. Something seems fishy to me, Captain, but I did have fish for lunch, so there's that."
	],
	choices : [
		"Tractor beam them as close as possible without endangering our ship. Beam aboard an away team in hazard suits to investigate the engine room trouble. If we can fix it before we all explode, perfect. If not, beam their entire crew aboard and we warp out of here like we stole something.",
		"Maintain a safe distance. Try to assist remotely, either by advising over comms or transporting supplies aboard. We can't afford to get close enough to dock or evacuate.",
		"Something's fishy here. Let's wait a few minutes and continue scanning their systems. If they're not lying, their engine core should overheat shortly, and we can move in and evacuate. If they are lying or turn hostile, denotate their core with a phaser blast."
	],
	outcomes : [
		"Ridiculous. They had their manifolds set to minimum and their ionization compensator set to 80 percent, what a bunch of dummies! Our engineers pushed a few buttons and sent them on their way. They paid us well for our time though, probably out of embarassment.",
		"We were able to identify the trouble and Engineering beamed over some parts, but when they powered up their teleporter to receive the parts, their electrical systems shorted out. Life support started failing so we beamed the crew of twelve aboard immediately, and their ship exploded shortly thereafter. They didn't seem too upset, apparently it was a rental, and they plan to leave at the next port. At least we salvaged one unit of fuel from their wreckage.",
		"Sensors indicate they're low on fuel and oxygen. There's minor radiation all over the ship but levels increase closer to the engineering section, peaking at levels of WHOA they just exploded. I think we waited too long to help, Captain. We should probably just move along now..."
	],
	rewards : [
		function gotThousandCash() {// add 1000 to wallet
			index = $(this).attr('data-index'),
			wallet = parseInt($('.wallet p').text()),// get current money
			newWallet = wallet + 1000;// add 1000 to initial money

			$('.wallet p').text(newWallet);// set new wallet
			showOutcome();
			showEffect("<b class='incident-outcome good'>Effect: Gained 1000 cash.</b>");
		},
		function gotOneFuel() {// add 1 to fuel
			index = $(this).attr('data-index');
			fuel = parseInt($('.fuel p').text());
			newfuel = fuel + 1;
			$('.fuel p').text(newfuel);
			currentFuel = parseInt($('.fuel p').text());
			// print outcome
			index = $(this).attr('data-index');
			showOutcome();
			showEffect("<b class='incident-outcome good'>Effect: Gained 1 unit of fuel.</b>");
		},
		function nothingHappened() {// nothing happened
			index = $(this).attr('data-index');
			showOutcome();
			showEffect("<b class='incident-outcome neutral'>Effect: None.</b>");
		},
	],
	hasHappened : false
};

// Strange ship 3 (pirates in disguise)
incidents[3] = {
	title : "Captain, a small ship is approaching with no interplanetary registration markings.",
	description : "Their engines are offline and they're only moving due to their existing momentum. Comms are unresponsive." +
				  "Sensors detect faint eight life signs, they could be injured, sick, or in stasis but there's no " +
				  "way to tell without boarding or beaming them over directly. The ship itself doesn't seem to be damaged, " +
				  "but it is over twelve years old, and the starboard docking panel looks like it's seen heavy use. " +
				  "It's definitely too small to be a cargo or transport ship, it looks more like an orbital craft " +
				  "used to shuttle crews from space station to space station.",
	alternatives : [
		"They may have lost control and drifted out of orbit, there are a few inhabited planets in this system with that level of technology. If they're in stasis, they may not even know they're adrift.",
		"If they need assistance, they may pay us for our help. Or we could speed their situation along with a phaser blast or two, and salvage what's left...? Just thinking out loud, Captain.",
		"Three words, Captain: Not. Our. Problem. I suggest we keep moving, we have cargo to buy and sell and we're almost to our destination."
	],
	choices : [
		"Let's see if they need help. See if you can get them on the Comm again and get a sit-rep. If not, send an away team to see what's what.",
		"Tractor them in and begin docking procedures. Send a salvage team and a medic team over with a small security compliment. If they're healable, heal away. If we can't help, we take what we can carry and get back on board.",
		"Time is money, and that ship looks interesting. They shouldn't even be out here anyway, nobody probably knows they're here. Put a hole in the hull, wait for the oxygen to evacuate, and then see what we can salvage."
	],
	outcomes : [
		"Captain, please don't be mad. The ship didn't reply to our hails, so we sent an away team like you ordered, with security and everything. So, they got on board, went to the cargo hold, and then they found some bodies in stasis. That's kind of where everything went wrong. When they woke up, the ship's crew activated security protocols, which deactivated our security team's weapons, and took our team hostage with a bunch of improvised weapons. Turns out they're escaped prisoners, and they want all our cash for the return of our away team.",
		"Oh boy, that didn't go well. Ah, Captain, the crew of the ship wasn't in stasis, or injured, they were masking their life signs with portable biorhythmic dampeners. They tried to take the medical crew hostage, but the salvage crew fought back, and then security joined in, and well, basically everyone got shot. Also, the airlock control got shot, and their ship forcably ejected away from ours. We lost the medics, the salvage team, and the security force, but worst of all, the airlock door cost 1000 cash to repair.",
		"We did just what you said, and after the air vented from the ship we sent an away team to investigate. Turns out they were escaped inmates from a penal colony on a nearby moon. Looks like they ran out of supplies a few days into their escape and went into stasis to wait for a ship to rescue them, presumably planning to hijack it and continue their escape. Good thing we shot first and asked questions much, much later, Captain. We got a good haul from that one."
	],
	rewards : [
		function lostAllCash() {// set wallet to zero
			index = $(this).attr('data-index'),
			wallet = parseInt($('.wallet p').text()),// get current money
			newWallet = 0;// set money to 0 (boo hoo)

			$('.wallet p').text(newWallet);// set new wallet
			showOutcome();
			showEffect("<b class='incident-outcome bad'>Effect: Lost all cash.</b>");
		},
		function lostThousandCash() {// subtract 1000 from wallet
			index = $(this).attr('data-index'),
			wallet = parseInt($('.wallet p').text()),// get current money
			newWallet = wallet - 1000;// subtract 1000 from initial money

			if (wallet < 1000) {
				newWallet = 0;
			} else {
				// do nothing
			}

			$('.wallet p').text(newWallet);// set new wallet
			showOutcome();
			showEffect("<b class='incident-outcome bad'>Effect: Lost 1000 cash.</b>");
		},
		function gotRandomCash() {// add random amount of cash from 400 to 1000
			index = $(this).attr('data-index'),
			rando = getRandomNumber(400, 1000),// get random amount of cash
			wallet = parseInt($('.wallet p').text()),// get current money
			newWallet = wallet + rando;// add random amount to wallet

			$('.wallet p').text(newWallet);// set new wallet
			showOutcome();
			showEffect("<b class='incident-outcome good'>Effect: Gained " + rando + " cash.</b>");
		}
	],
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