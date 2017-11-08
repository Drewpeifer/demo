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
	type : "Unknown Vessel Approaching",
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
			func : function() { return loseRandomGoods(); }
		},
	},
	isHappening : false,
	hasHappened : false
}

incidents[2] = {
	type : "Unknown Vessel Approaching",
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

incidents[3] = {
	type : "Distress Signal",
	description : "Captain, we've received a distress signal from an unknown vessel. " +
				  "They say their engines are malfunctioning, and exhaust plasma has leaked into the ship's engineering section. " +
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
        "Something's fishy here. Let's wait a few minutes and continue scanning their systems. If they're not lying, their engine core should overheat shortly, and we can move in and evacuate. If they are lying or turn hostile, detonate their core with a phaser blast."
	],
	outcomes : {
		0 : {
			type : "good",
			description : "Ridiculous. They had their manifolds set to minimum and their ionization compensator set to 80 percent, what a bunch of dummies! Our engineers pushed a few buttons and sent them on their way. They paid us well for our time though, probably out of embarassment.",
			effect : "+1000 Credits",
			func : function() { return walletChange(1000); }
		},
		1 : {
			type : "good",
			description : "We were able to identify the trouble and Engineering beamed over some parts, but when they powered up their teleporter to receive the parts, their electrical systems shorted out. Life support started failing so we beamed the crew of twelve aboard immediately, and their ship exploded shortly thereafter. They didn't seem too upset, apparently it was a rental, and they plan to leave at the next port. At least we salvaged one unit of fuel from their wreckage.",
			effect : "+1 fuel",
			func : function() { return fuelChange(1); }
		},
		2 : {
			type : "neutral",
			description : "Sensors indicate they're low on fuel and oxygen. There's minor radiation all over the ship but levels increase closer to the engineering section, peaking at levels of WHOA they just exploded. I think we waited too long to help, Captain. We should probably just move along now...",
			effect : "No consequence",
			func : function() { return nothingHappened(); }
		},
	},
	isHappening : false,
	hasHappened : false
}

incidents[4] = {
	type : "Unknown Vessel Approaching",
	description : "Captain, a small ship is approaching with no interplanetary registration markings. " +
				  "Their engines are offline and they're only moving due to their existing momentum. Comms are unresponsive. " +
                  "Sensors detect eight faint life signs, they could be injured, sick, or in stasis but there's no " +
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
	outcomes : {
		0 : {
			type : "bad",
			description : "Captain, please don't be mad. The ship didn't reply to our hails, so we sent an away team like you ordered, with security and everything. So, they got on board, went to the cargo hold, and then they found some bodies in stasis. That's kind of where everything went wrong. When they woke up, the ship's crew activated security protocols, which deactivated our security team's weapons, and took our team hostage with a bunch of improvised weapons. Turns out they're escaped prisoners, and they want all our cash for the return of our away team.",
			effect : "Lost all cash",
			func : function() { return walletChange(-stats.wallet); }
		},
		1 : {
			type : "bad",
			description : "Oh boy, that didn't go well. Ah, Captain, the crew of the ship wasn't in stasis, or injured, they were masking their life signs with portable biorhythmic dampeners. They tried to take the medical crew hostage, but the salvage crew fought back, and then security joined in, and well, basically everyone got shot. Also, the airlock control got shot, and their ship forcably ejected away from ours. We lost the medics, the salvage team, and the security force, but worst of all, the airlock door cost 1000 cash to repair.",
			effect : "Lost 1000 cash",
			func : function() { return walletChange(-1000); }
		},
		2 : {
			type : "good",
			description : "We did just what you said, and after the air vented from the ship we sent an away team to investigate. Turns out they were escaped inmates from a penal colony on a nearby moon. Looks like they ran out of supplies a few days into their escape and went into stasis to wait for a ship to rescue them, presumably planning to hijack it and continue their escape. Good thing we shot first and asked questions much, much later, Captain. We got a good haul from that one.",
			effect : "Gained random amount of cash",
			func : function() { return walletChange(getRandomNumber(10000, 20000)); }
		},
	},
	isHappening : false,
	hasHappened : false
}

incidents[5] = {
	type : "Derelict Vessel",
	description : "Captain, derelict ship ahead. Freighter class, no life signs detected. " +
		"Sensors detect damage to the starboard engine and surrounding hull. Engineering says it looks like a mid-flight collision, they're not sure with what though. " +
        "However, they can tell she's been adrift for a while by the nacell deterioration and " +
        "complete lack of heat signature. One thing's for sure: there's cargo in that hold.",
	alternatives : [
        "Their life support systems seem to have failed at some point, and the oxygen has seeped out. Everything inside should have been preserved by the vacuum pretty well.",
        "It's always a gamble climbing aboard an unknown vessel, but it doesn't look like much could go wrong here.",
        "Just for the record though, something killed that crew, Captain. Maybe we should tread lightly."
	],
	choices : [
        "Pop the doors and loot the hold, boys. Just wear your hazard suits and don't push any buttons while you're over there.",
        "Cut the cargo bay doors open with the phasers. We'll grab what we can with the tractor beam but we're not boarding that deathtrap.",
        "Meh. It's a freighter but not heavily armed, I bet the cargo's not very valuable. Let's keep moving."
	],
	outcomes : {
		0 : {
			type : "good",
			description : "Loot secured, Captain! We found some good stuff, we even brought back some movies and books from their library. Dobson found some logs about an experimental asteroid mining procedure, but it was boring stuff so we grabbed some old episodes of Matlock instead.",
			effect : "Gained random goods",
			func : function() { return gainRandomGoods(); }
		},
		1 : {
			type : "good",
			description : "Most of the stuff sucked out into space was miscellaneous mining equipment, just parts really. Engineering said they could sell some of it next time a peddler probe comes by. Oh, here's one now! Aaaaand.... Sold.",
			effect : "Gained random amount of cash",
			func : function() { return walletChange(getRandomNumber(2000, 5000)); }
		},
		2 : {
			type : "neutral",
			description : "Probably a good call, Captain. Never hurts to play it safe. Kind of boring though, right?",
			effect : "No consequence",
			func : function() { return nothingHappened(); }
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