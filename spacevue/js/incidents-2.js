// random incidents that occur during travel phase
// incidents [X] : {
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

incidents[0] : {
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
				"established contact via flashing lights on their hull, and apparently" +
				"just needed some directions to the nearest starport. We sent some " +
				"star charts over, and they sent us back some fuel.",
			effect : "Gained 2 fuel!",
			func : fuelChange(delta, stats) {
						if (delta > 0) {
							stats.fuel += delta;
						} else {
							stats.fuel -= delta;
						}
					}

		},
		1 : {
			type : "bad",
			description : "Apparently they didn't like that, Captain. They sent out a " +
				"signal burst that disabled our power core instantly, engineering " +
				"is working on the repairs now. Then they just coasted by us without " +
				"attacking. I guess we weren't on the menu today.",
			effect : "Repairs cost 400 credits",
			func : walletChange(delta, stats) {
						if (delta > 0) {
							stats.wallet += delta;
						} else {
							stats.wallet -= delta;
						}
					}

		},
		2 : {
			type : "neutral",
			description : "Whew! That was close. We were out of their range before they " +
				"could even react. I'm not sure what that was all about, but no harm, no " +
				"foul, right Captain?",
			effect : "No consequence.",
			func : nothingHappened();
		}
	},
	isHappening : false,
	hasHappened : false
}