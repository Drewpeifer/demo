// random incidents that occur during travel phase
// incidents [X] = {
// 	type : "recurring event subtitle",
// 	description : "long text describing event pre-conditions",
// 	alternatives : [
// 		"three different peices of advice",
// 		"from your bridge members that may",
// 		"or may not help your decision"
// 	],
// 	choices : [
// 		"three choices that populate button text, corresponding",
// 		"to the three following outcomes",
// 		"linked by their order (index)"
// 	],
// 	outcomes : {
// 		0-2 : {
// 			type : "good / bad / neutral",
// 			description : "semi-long string describing results of choice",
// 			effect : "short text description of outcome, e.g. lost 2 fuel",
// 			func : method() that applies outcome to objects
// 		}
// 	},
// 	isHappening : always set to false unless currently active,
// 	hasHappened : always set to false until incident is over
// }

incidents = [];

incidents[0] = {
	type : "Unknown Ship Approaching",
	description : "Captain, an unknown ship is on approach, sensors are reading " +
		"heavy weaponry and dense shields. Vessel is not responding to hails. " +
		"What should we do?",
	alternatives : [
		"Engineering is detecting radiation from their drive core, could be an emergency (or an ambush).",
		"Just a note, navigation says there's been increased pirate traffic in this sector.",
		"The hull shows signs of combat; there are scratches and scorch marks, just on the rear of the ship."
	],
	choices : [
		"Hold course and keep hailing, all known frequencies and languages.",
		"Shields up. Target their weapons. Hold position.",
		"Shields at maximum! Hit the gas and get us out of here!"
	],
	outcomes : {
		0 : {
			type : "good",
			description : "Captain, it seems their communications array was down. They " +
				"established contact via flashing lights on their hull, and apparently " +
				"just needed some directions to the nearest starport. We sent some " +
				"star charts over, and they sent us back some fuel.",
			effect : "Gained 2 fuel!",
			func : function() { return fuelChange(2); }
		},
		1 : {
			type : "bad",
			description : "Apparently they didn't like that, Captain. They sent out a " +
				"signal burst that disabled our power core instantly, engineering " +
				"is working on the repairs now. Then they just coasted by us without " +
				"attacking. I guess we weren't on the menu today.",
			effect : "Repairs cost 400 credits",
			func : function() { return walletChange(-400); }

		},
		2 : {
			type : "neutral",
			description : "Whew! That was close. We were out of their range before they " +
				"could even react. I'm not sure what that was all about, but no harm, no " +
				"foul, right Captain?",
			effect : "No consequence.",
			func : function() { return nothingHappened(); }
		}
	},
	isHappening : false,
	hasHappened : false
}

incidents[1] = {
	type : "Stellar Anomaly Detected",
	description : "Captain, we've warped right to a black hole! It's been a while since you've seen any debris around, " +
                  "turns out there's a nearby singularity pulling everything in. " +
                  "A lot of spacers liken black holes to quicksand; some rely on " +
                  "beefy engines for a quick getaway, others swear by a calm, methodical escape.",
	alternatives : [
        "Scanners report a calm event horizon, with minimal radiation signature.",
        "There's something coming out of the center, a faint hum that vibrates the hull.",
        "This singularity has recently consumed a nearby star, we need to steer clear of the plasma circling the event horizon."
	],
	choices : [
        "Kick the throttle and burn some Go Juice! GO GO GO!",
        "Easy, take it slow and give her a wide berth. The less energy we expend, the better.",
        "Let's stay a few minutes and take in the sights. It's probably not that dangerous."
	],
	outcomes : {
		0 : {
			type : "neutral",
			description : "Whew. Coasted by without incident. Luckily our approach was far enough from the epicenter to give us time to steer away.",
			effect : "No consequence",
			func : function() { return nothingHappened(); }
		},
		1 : {
			type : "bad",
			description : "Our plasma exhaust has been ignited by an unknown source, we're safely away from the black hole but fuel reserves briefly leaked into space.",
			effect : "Lost 2 fuel",
			func : function() { return fuelChange(-2); }
		},
		2 : {
			type : "bad",
			description : "Our cargo module was struck by a peice of incoming debris attracted by the singularity. We lost some goods, but we escaped with our lives. Well, Dobson died.",
			effect : "lost some stuff",// replaced by func
			func : function() { return lostRandomGoods(); }
		},
	},
	isHappening : false,
	hasHappened : false
}

incidents[2] = {
	type : "Unknown Ship Approching",
	description : "Captain, a strange ship is on approach, hailing in an unknown language. " +
				  "Our sensors can't seem to penetrate their hull to analyze their systems, " +
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
	outcomes : {
		0 : {
			type : "good",
			description : "They've responded to our musical intonation array! It seems they communicate by singing complex songs that can last up to ten hours. The computer is currently building a dictionary or their language but so far we know they are peaceful, advanced, and happy to meet us. They say our ship can't be fitted with a shield like theirs, but they've graciously refined our current fuel (somehow) to burn twice as efficiently!",
			effect : "Fuel doubled!",
			func : function() { return fuelChange(stats.fuel); }
		},
		1 : {
			type : "neutral",
			description : "They broadcasted for a few minutes longer, Captain, but they seem to be resuming their original course at speeds we cannot match. I'm not sure if our posture was taken as overly offensive or overly defensive, or maybe they just got bored waiting for a reply, but I guess we'll never know who they were.",
			effect : "No consequence",
			func : function() { return nothingHappened(); }
		},
		2 : {
			type : "bad",
			description : "Captain, our warning shot accidentally hit their shields! They've returned fire and melted our phasers right through our shields! I think they even teleported our torpedos out of their tubes and into space. We can make repairs but it'll take time and cost money; luckily, they seem to be resuming their course at high speed. We've received a message as well, Captain. The computer's translation approximates it to be 'LATER, JERKS'.",
			effect : "Lost 10% cash",
			func : function() { return walletChange(-stats.wallet * .1)}
		},
	},
	isHappening : false,
	hasHappened : false
}

// incidents[X] = {
// 	type :
// 	description :
// 	alternatives : [],
// 	choices : [],
// 	outcomes : {
// 		0 : {
// 			type :
// 			description :
// 			effect :
// 			func :
// 		},
// 		1 : {
// 			type :
// 			description :
// 			effect :
// 			func :
// 		},
// 		2 : {
// 			type :
// 			description :
// 			effect :
// 			func :
// 		},
// 	},
// 	isHappening : false,
// 	hasHappened : false
// }