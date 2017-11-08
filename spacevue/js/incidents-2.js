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

incidents[6] = {
	type : "Derelict Vessel",
	description : "Derelict sighted, Captain. Scanners show no humanoid lifesigns, though we do see readings that " +
                  "might indicate plant-based lifeforms, or vegetation we're unfamiliar with. " +
                  "From the large dome structures on either side of the ship, I'd say it was " +
                  "most likely a science vessel, or terraforming crew. Those domes " +
                  "seem to have minimal power, but the rest of the ship is dead in the water.",
	alternatives : [
        "Maybe it's a new lifeform we can make contact with, even though we don't have 'plant' language in our translation matrix.",
        "Maybe there's edible vegetation, or stasis tech we could, uh, appropriate?",
        "With no damage to the ship and remaining power shifted to the domes, that may be where the crew is waiting, or whatever cargo they died trying to save."
	],
	choices : [
        "Send a Science team and a Security team. See what they can recover from the domes and the databanks.",
        "Send a Security team and an Engineering team. I want to know what those domes are preserving, and what tech we can salvage.",
        "Approach and scan the vessel. Get more readings from the domes and the Engineering section. Something's odd here."
	],
	outcomes : {
		0 : {
			type : "good",
			description : "Our Science team recovered some logs from the ship's databanks. Seems it was a Research vessel trying to breed sentient plants that could grow in any conditions. The plants decided to take over the ship, and the interior of the ship is now covered in vegetation. It doesn't seem hostile, but without hazard suits, the oxygen levels would be poisonous. That's probably what killed the crew. The Science team was able to salvage some extra fuel, though!",
			effect : "+5 fuel",
			func : function() { return fuelChange(5); }
		},
		1 : {
			type : "good",
			description : "The entire vessel was lined with vegetation, but the Security team was able to activate flame turrets around the ship, incinerating all the plants. After they shot all the ashes out into space, the Engineering team was able to cut one of the domes off the ship and attach it to our stern! Now our cargo hold is HUGE!",
			effect : "Cargo capacity doubled!",
			func : function() { return cargoCapIncrease(stats.cargoCap); }
		},
		2 : {
			type : "neutral",
			description : "You were right captain, we read 125 corpses in the entire ship, oxygen levels at 500% the lethal limit for humans. Looks like some kind of vegetation escaped the domes and took over the ship, overloading the oxygen scrubbers and asphyxiating the crew. Yikes. Continuing on course.",
			effect : "No consequence",
			func : function() { return nothingHappened(); }
		},
	},
	isHappening : false,
	hasHappened : false
}

incidents[7] = {
	type : "Asteroid Field Ahead",
	description : "There's a gaseous nebula above the field, and a belt of radiation below it. " +
                  "Our hull is tough enough to take a few minor impacts, if you want to try " +
                  "going straight through. The repair cost may be lower than the fuel cost if " +
                  "we try to go around it. We definitely need to get to the other side, though." +
                  "The field density is low enough we can fit the ship through most of the " +
                  "larger gaps, but we can't predict the motions of the asteroids at all." +
                  "Basically we have 3 choices: Go over, go under, or go through. Your call, Cap'n.",
	alternatives : [
        "If I were a gambler, which I'm not, I'd say we could make it through the field with minimal damage from collisions.",
        "If I were a gambler, which I am, I'd say we should try our luck going over the field, skimming through the bottom of the nebula. It may affect instruments but won't cause any damage.",
        "If I were a gambler, which I may or may not be, I'd say go under. We can handle a little radiation. Right?"
	],
	choices : [
        "Go over the field. Keep an eye on instrumentation but we can handle a short trip in the nebula.",
        "Raise shields and go right through the field! Do some barrel rolls, too.",
        "Go under the field, and keep an eye on radiation levels. Let's all get tans."
	],
	outcomes : {
		0 : {
			type : "bad",
			description : "The nebula didn't cause any damage but we got turned around a little. We spent some extra fuel and time fixing our course, but we're no worse for wear.",
			effect : "-2 Fuel",
			func : function() { return fuelChange(-2); }
		},
		1 : {
			type : "bad",
			description : "That was AWESOME-- uh, sorry Captain, sir. We took a few bumps but repairs will be cheap, and our Pilot got to do some sweet barrel rolls. You're the best, Captain.",
			effect : "Lost 200 cash",
			func : function() { return walletChange(-200); }
		},
		2 : {
			type : "bad",
			description : "Ugh, Captain, that radiation was a type we've never experienced before. The effects were more severe than we anticipated. Dobson is still sick but we've mostly recovered, med supplies weren't cheap though.",
			effect : "Lost half your credits",
			func : function() { return walletChange(-stats.wallet * .5); }
		},
	},
	isHappening : false,
	hasHappened : false
}

incidents[8] = {
	type : "Stellar Anomaly Detected",
	description : "Gaseous nebula dead ahead, and it's a few aU's in length captain, there's no way we can go around. " +
                  "We can try going through with our shields up, but electrical and " +
                  "plasma-based systems are known to react chaotically with radiation " +
                  "that forms within nebula. The gas is too thick for our scanners to " +
                  "penetrate, but we do know the distance directly through the nebula " +
                  "is much shorter than any route we can safely navigate.",
	alternatives : [
        "Perhaps our shields will provide enough protection from radiation that we can pass through unharmed.",
        "The dense dust may prove problematic for our engine intake modulators, so high speeds are not recommended within the nebula, Captain. They're certainly possible though.",
        "We do know asteroids and other particulates pass through to the other side virtually unchanged, at least according to our sensors."
	],
	choices : [
        "Shields up, maximum speed. The less time we spend in there, the better.",
        "Keep the shields down and shut down all non-necessary systems. Let's slip through at full impulse power, quiet and steady.",
        "Let's try acting like a rock. Give us a quick warp boost and then shut down all systems except life support. We'll drift through like an asteroid slowly, but safely."
	],
	outcomes : {
		0 : {
			type : "bad",
			description : "Captain, we did get through quickly, but we had to use twice as much fuel as projected. But the engine intakes couldn't handle the rapid influx of dust and gasses, they got pretty clogged up, and the shields overloaded a little in the aft sections but we recovered quickly. Repairs were minor, but we had to buy parts from a nearby outpost moon.",
			effect : "-1 Fuel",
			func : function() { return fuelChange(-1); }
		},
		1 : {
			type : "good",
			description : "Whew, that was tense. Sensors malfunctioned in just about every possible way but we maintained course and got through unscathed. We also found some wreckage within the nebula, and retrieved it with the tractor beam. Looks valuable to me, but what do I know.",
			effect : "Gained random amount of credits",
			func : function() { return walletChange(getRandomNumber(1000, 5000)); }
		},
		2 : {
			type : "bad",
			description : "We coasted through without incident, Captain. Our ship needs all the dust and crap washed off of it, but we can handle that in the next port. We lost some time by travelling under momentum instead of propulsion though, so we were a little late to port, and we needed to get our ship registration renewed a few days ago. There was, shall we say, a late fee.",
			effect : "-1000 credits",
			func : function() { return walletChange(-1000); }
		},
	},
	isHappening : false,
	hasHappened : false
}

incidents[9] = {
	type : "Stellar Anomaly Detected",
	description : "Wormhole sighted, Captain! " +
				  "We detected an energy fluctuation dead ahead, and just as " +
                  "our ship decelerated this crazy wormhole opened up! What should " +
                  "we do, Captain? We can go through it and end up who knows where, " +
                  "or stay here and take some readings before we move on. Or, we can just " +
                  "drop a beacon and log it on our charts before resuming course.",
	alternatives : [
        "It's kind of intriguing though, right? A door to anywhere, and we can just fly right in.",
        "Without knowing where we're going to end up though, I'd suggest we steer clear of it, whatever you decide.",
        "Most wormholes are unstable though, we may never get another chance to see one again. I say we cowboy up and head on in!"
	],
	choices : [
        "Stow your gear and hang on tight, we're going to find out where this leads. Full speed ahead!",
        "Let's send in a Class 1 probe, set it for automatic return in ten minutes, then we're on our way. I'm not risking this ship and its crew for some nerdy research joyride.",
        "Nope! I've seen enough movies to know that wormholes never take you somewhere good. Steady as she goes, let's float right on by."
	],
	outcomes : {
		0 : {
			type : "neutral",
			description : "Um, we seem to be exactly where we were when we entered the wormhole, Captain, just facing the opposite direction. Also, our clothes are on backwards. Interesting.",
			effect : "Backwards clothes",
			func : function() { return nothingHappened(); }
		},
		1 : {
			type : "bad",
			description : "Captain, you're not going to believe this. We launched the probe like you ordered, and ten minutes later it came flying out of the wormhole WAY faster than we programmed it to, and it crashed right through the docking bay doors. We fixed everything, but Dobson is dead, and the probe's completely destroyed so we don't even know where it went. Also, we lost some cargo. I blame Dobson.",
			effect : "Lost random goods",
			func : function() { return loseRandomGoods(); }
		},
		2 : {
			type : "bad",
			description : "Captain! We tried to coast by but something came out of the wormhole right in our path! It ripped through the hull and grabbed Dobson! The security cameras only caught a few frames, but it looked like a giant tentacle! Repairing the hull was cheap, but that's CRAZY! And sad, about Dobson.",
			effect : "-500 Credits",
			func : function() { return walletChange(-500); }
		},
	},
	isHappening : false,
	hasHappened : false
}

incidents[10] = {
	type : "Incoming Signal",
	description : "Uh, Captain? We seem to be receiving hails from... ourselves." +
				  "I'm really not sure what's going on, Captain. That looks like " +
                  "our ship, heavily damaged, and they're using our communication encryptions, but " +
                  "they just came out of nowhere! They're broadcasting a message on " +
                  "an endless loop in old Morse code: YOURE BEING FOLLOWED!",
	alternatives : [
        "HOPE YOU DO BETTER THAN WE DID!",
        "WE OUTRAN THEM AND HIT A TIME VORTEX! AVOID THE VORTEX!",
        "DONT TRY TO FIGHT THEM! YOU WILL BE WARPED INTO THE PAST!"
	],
	choices : [
        "That was us, I know it! I have to do something unpredictable! Pilot, fly randomly! Engineering, vary speed randomly! Communications, broadcast all music files on all frequencies! Everybody HANG ON!",
        "Whoever that is in front of us, they may not be lying about whoever's behind us. Full speed ahead, evasive maneuvers if anyone is sighted along our route. Go!",
        "I don't know who that is, or who might be following us, but I'm not playing games here. Raise shields, power up weapons, and hold position. We'll see soon enough what's going on here."
	],
	outcomes : {
		0 : {
			type : "bad",
			description : "Captain, that was the craziest idea ever. I'm not sure who that ship was, or if anyone was really following us, but we've lost them both. Also, everyone on board threw up except for you.",
			effect : "Everone threw up (except you)",
			func : function() { return nothingHappened(); }
		},
		1 : {
			type : "neutral",
			description : "Whoa, Captain, that ship that looked like us flew away as we powered up our engines. We climbed up to warp speed and suddenly hit an energy rift of some kind, causing mild damage to our ship. We're close to our last coordinates, and we're only able to activate the Morse transmitter, I suggest we travel there and warn ourselves immediately. Hopefully we do better next time.",
			effect : "Deja vu",
			func : function() { return nothingHappened(); }
		},
		2 : {
			type : "good",
			description : "Captain, we were being followed by freaky space pirates! They attacked as soon as they caught up with us, but with the combined firepower of our ship and the other mirror universe bizarro version of our ship, we totally kicked the crap out of them! That was so crazy! The other us flew off after the battle, and even though it'd be awesome, I don't think we should follow them.",
			effect : "Confidence boost. And Dobson's here! I thought he was dead! Weird, right?",
			func : function() { return nothingHappened(); }
		},
	},
	isHappening : false,
	hasHappened : false
}

incidents[11] = {
	type : "Unkown Vessel Approaching",
	description : "Captain, the guy in the blue phonebooth is here again. " +
				  "We've heard about this guy before, he's some kind of travelling " +
                  "physician or something. I know, right? House calls in space. He seems " +
                  "harmless, but we don't have much information on him other than an array " +
                  "of mugshots (and they're all different). Records also indicate he has a " +
                  "\"thing\" for what he calls Jelly Babies. We're pretty sure he means " +
                  "Gummy Bears, Captain, and I think we have some in storage...?",
	alternatives : [
        "Maybe he'd be willing to trade candy for something valuable? It's not our fault if he's dumb.",
        "We've also documented a series of companions he travels with, not much in common except they're all young and, uh, female. Interesting.",
        "Maybe he can help Dobson with his night terrors? LOL Cap'n, let's beam Dobson over there without telling either of them."
	],
	choices : [
        "I ate all the Gummy Bears. Those were the Captain's Gummy Bears. Send this joker some Gummy Worms instead and see what he does.",
        "I don't trust people in wooden space ships. Hail the box and see what it's doing out here. Go to yellow alert, shields up.",
        "Beam Dobson over, he needs some professional help. Tell him to ask about flu shots too. Space Flu, specifically."
	],
	outcomes : {
		0 : {
			type : "good",
			description : "Ha! We beamed over some Gummy Worms, and apparently he's never had them before. Seems like we made a friend. Not sure why he sent us this crate of bow ties, suspenders, scarves, and fez's, but they're cool. I guess. We'll sell the freaky clothing to the next hipster merchant we see, maybe get some fuel in return.",
			effect : "+4 Fuel",
			func : function() { return fuelChange(4); }
		},
		1 : {
			type : "neutral",
			description : "He said he's glad to meet us, Captain. Then he said it again. And again. And again. It's like he's stuck in some sort of loop. We should just move on.",
			effect : "Nothing happened. Nothing happened. Nothing happened. Nothing happened. Nothing happened.",
			func : function() { return nothingHappened(); }
		},
		2 : {
			type : "good",
			description : "Dobson is back, he says the pilot of the other ship didnt know anything about Space Flu or night terrors, but he did modify our cargo hold. Somehow it's bigger on the inside now! All he asked for in return was Dobson's mustache. Weird, right?",
			effect : "Cargo capacity doubled!",
			func : function() { return cargoCapIncrease(stats.cargoCap); }
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