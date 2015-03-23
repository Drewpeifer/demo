// Reward Functions //
// referenced in incidents.rewards
// and bound to choice buttons
////////////////////////////////////
function nothingHappened() {// nothing happened
    index = $(this).attr('data-index');
}
function fuelChange(amount) {// gain/lose X fuel
    // pass pos amount for gain,
    // neg amount for loss,
    // pass str "double" for 2X fuel, "half" for .5X fuel
    oldFuel = parseInt($('.fuel p').text()),
    incident = $(this);

    if (amount == "double") {// double fuel
        if (oldFuel == 0) {// hmmm
            newFuel = oldFuel + 2;
            incident[0].type = "good";
            incident[0].effect = "We were out of fuel, so we got 2 units out of pity! Yay pity!";
        } else {
            newFuel = oldFuel * 2;
            incident[0].type = "good";
            incident[0].effect = "Fuel doubled to " + newFuel + "!";
        }
    } else if (amount == "half") {
        // lose half fuel
        if (oldFuel == 1 || oldFuel == 0 ) {
            // not enough fuel to subtract
            newFuel = 0;
            incident[0].type = "bad";
            incident[0].effect = "Fuel reduced to 0!";
        } else {
            // enough fuel to subtract
            newFuel = oldFuel / 2;
            incident[0].type = "bad";
            incident[0].effect = "Fuel reduced to " + newFuel + "!";
        }
    } else if (amount < 0) {// fuel loss
        incident[0].type = "bad";
        if (oldFuel <= Math.abs(amount)) {
            newFuel = 0;// no fuel!
            incident[0].effect = "Fuel reduced to " + 0 + "!";
        } else {
            newFuel = oldFuel + amount;// add, b/c loss is a neg amount
            incident[0].effect = "" + amount + " fuel, we now have " + newFuel;
        }
    } else {// fuel gain
        type = "good";
        newFuel = oldFuel + amount;// add, b/c loss is a neg amount
        incident[0].effect = "" + amount + " fuel, we now have " + newFuel;
    }

    $('.fuel p').text(newFuel);
    currentFuel = parseInt($('.fuel p').text());
}
function walletChange(amount) {
    currentWallet = parseInt($('.wallet p').text());// get current money
    // incident IS ACTUALLY THE WHOLE INCIDENT! now we need index, SHIT
    console.log("this");
    console.log($(this));
    console.log("incident = ");
    console.dir(incident);
    button = $('.button.clicked');
    console.dir(button);

    key = button.attr('data-index');
    console.log("key = " + key);
    reward = incident.rewards[key];
    console.log("reward = ");
    console.dir(reward);
    console.log('walletchange start');

    if (amount == "bankrupt") {
        newWallet = 0;
    } else if (amount == "rando") {
        rando = getRandomNumber(1000, 10000);
        newWallet = currentWallet + rando;
        reward.effect = "Cash increased by " + rando + " to $" + newWallet;
        console.log("effect = " + reward.effect);
    } else if (amount == "double") {// double money
        if (currentWallet == 0) {// no moneys to begin with
            newWallet = currentWallet + 1000;
            reward.type = "good";
            reward.effect = "We were out of cash, so they gave us $1000 out of pity! Yay pity!";
        } else {
            newWallet = currentWallet * 2;
            reward.type = "good";
            reward.effect = "Cash doubled to $" + newWallet + "!";
        }
    } else if (amount == "half") {// lose half money
        if (currentWallet == 0 || currentWallet == 1) {// no moneys to begin with
            newWallet = 0;
            reward.type = "bad";
            reward.effect = "Lost all cash";
        } else {
            newWallet = currentWallet / 2;
            reward.type = "bad";
            reward.effect = "Cash halved to $" + newWallet;
        }
    } else if (amount < 0 && amount > -1) {
        // neg percentage passed (.X), translates to "minus .X * currentWallet"
        console.dir(reward);
        if (currentWallet == 1 || currentWallet == 0 ) {
            // not enough money to subtract
            newWallet = 0;
            reward.type = "bad";
            reward.effect = "Cash reduced to 0";
        } else {
            // enough money to subtract
            newAmount = Math.floor(amount * currentWallet);
            newWallet = currentWallet + newAmount;// add, b/c its neg
            reward.type = "bad";
            reward.effect = "Cash reduced by " + newAmount + " to $" + newWallet + "!";
        }
    } else if (amount < 1 && amount > 0) {
        // pos percentage passed (.X), translates to "add .X * currentWallet"
        newAmount = Math.floor(amount * currentWallet);
        newWallet = currentWallet + newAmount;
        reward.type = "good";
        reward.effect = "Cash increased by " + newAmount + " to $" + newWallet + "!";
    } else if (amount < 0) {// money integer loss
        reward.type = "bad";
        if (currentWallet <= Math.abs(amount)) {
            newWallet = 0;// no money!
            reward.effect = "Cash reduced to 0";
        } else {
            newWallet = currentWallet + amount;// add, b/c loss is a neg amount
            reward.effect = "Cash reduced by " + amount + " to $" + newWallet + "!";
        }
    } else {// cash gain
        newWallet = currentWallet + amount;// add, b/c loss is a neg amount
        reward.type = "good";
        reward.effect = "Gained " + amount + " cash, we now have $" + newWallet;
    }

    console.dir(reward);
    console.log('walletchange stop');

    $('.wallet p').text(newWallet);// set new wallet
}
function lostRandomGoods() {// lost some random goods
    ownedLoot = [],
    incident = $(this);
    console.dir(incident);
    // build list of loot that you own
    menuA.forEach(function(stock){
        if(stock.loot != 0) {
            ownedLoot.push(stock);
        }
    });

    if (ownedLoot.length < 1) {
        // modify effect text
        incident[0].type = "neutral";
        incident[0].effect = "No goods to lose, nothing changes."
    } else {
        // pick a random item from the list
        randomOwnedLoot = ownedLoot[Math.floor(Math.random()*ownedLoot.length)];
        randomLossVal = Math.floor(Math.random()*parseInt(randomOwnedLoot.loot) + 1);
        // find accompanying DOM row
        targetLoot = $('.market td:contains("' + randomOwnedLoot.title + '")').siblings('.loot');
        targetLootVal = targetLoot.text();
        // recalc value
        newLootVal = parseInt(randomOwnedLoot.loot) - randomLossVal;
        // set new loot value on obj
        randomOwnedLoot.loot = newLootVal;
        //set new loot value in DOM
        targetLoot.text(newLootVal);
        // modify effect text
        incident[0].type = "bad";
        incident[0].effect = "We lost " + randomLossVal + " of our " + randomOwnedLoot.title;
    }
}
function gotRandomGoods() {
    incident = $(this);

    if ($('.cargo').hasClass('invalid')) {
        incident[0].type = 'bad';
        incident[0].effect = "Our cargo's full, otherwise we would have gotten stuff";
    } else {
        currentCargo = parseInt($('.cargo p.loot').text()),
        currentCap = parseInt($('.cargo p.cap').text()),
        availableSpace = currentCap - currentCargo,
        randomLootAmount = getRandomNumber(1, availableSpace),
        //randomLoot = menuA[4], set to unobtanium for debug
        randomLoot = menuA[Math.floor(Math.random()*menuA.length)],
        currentStock = randomLoot.loot,
        newStock = currentStock + randomLootAmount;
        // find accompanying DOM row
        targetLoot = $('.market td:contains("' + randomLoot.title + '")').siblings('.loot');
        targetLoot.text(newStock);

        $('.cargo p.loot').text(newStock);
        incident[0].type = 'good';
        incident[0].effect = "Gained " + randomLootAmount + " " + randomLoot.title;
    }
}
function cargoCapDoubled() {
    incident = $(this);
    cargoCap = parseInt($('.cargo p.cap').text());
    newCap = cargoCap * 2;
    $('.cargo p.cap').text(newCap);
    incident[0].type = "good";
    incident[0].effect = "Cargo capacity doubled from " + cargoCap + " to " + newCap;
}


// Events that occur randomly when arriving at a new destination
// as part of the travel() function in travel.js
var incidents = [];

// sample incident
///////////////////
//incidents[i] - {
//  title : "This is what appears above the red line",
//  description : "This is first part of the text below the line",
//  alternatives : [ "Three options, one of which is chose randomly.",
//                 "It will be last line of text before the",
//                 "choice buttons, they represent good/bad/neutral advice"
//  ],
//  choices : [ "Three options, describing the actions",
//              "that captain can take to solve",
//              "the problem. Text is the button text."
//  ],
//    rewards : [
//        0-2 : { func : funcRef,
//                outcome : "Long text description of event outcome (white text)",
//                type : "bad/neutral/good, can be overriden within funcRef",
//                effect : "Short text descrip, can be overriden within funcRef (colored text)"
//        }
//    ]
//  hasHappened : this is always set to false. It will be changed to true after the event occurs.
//}

// Black Hole encounter
incidents[0] = {
    title : "Captain, we've warped right to a black hole!",
    difficulty : 1,
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
    rewards : {
        // Event functions
        0 : {  func : nothingHappened,
               outcome : "Whew. Coasted by without incident. Luckily our approach was far enough from the epicenter to give us time to steer away.",
               type : "neutral",
               effect : "None"
        },
        1 : {  func : fuelChange.bind(null, -2),
               outcome : "Our plasma exhaust has been ignited by an unknown source, we're safely away from the black hole but fuel reserves briefly leaked into space.",
               type : "bad",
               effect : "-2 fuel"
        },
        2 : {  func : lostRandomGoods,
               outcome : "Our cargo module was struck by a peice of incoming debris attracted by the singularity. We lost some goods, but we escaped with our lives. Well, Dobson died.",
               type : "bad",
               effect : "Lost some stuff"
        }
    },
    isHappening : false,
    hasHappened : false
};

// Strange ship 1 (new civilization encounter)
incidents[1] = {
    title : "Captain, a strange ship is on approach, hailing in an unknown language.",
    difficulty : 1,
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
    rewards : {
        0 : {  func : fuelChange.bind(null, "double"),
               outcome : "They've responded to our musical intonation array! It seems they communicate by singing complex songs that can last up to ten hours. The computer is currently building a dictionary or their language but so far we know they are peaceful, advanced, and happy to meet us. They say our ship can't be fitted with a shield like theirs, but they've graciously refined our current fuel (somehow) to burn twice as efficiently!",
               type : "good",
               effect : "Fuel doubled!"
        },
        1 : {  func : nothingHappened,
               outcome : "They broadcasted for a few minutes longer, Captain, but they seem to be resuming their original course at speeds we cannot match. I'm not sure if our posture was taken as overly offensive or overly defensive, or maybe they just got bored waiting for a reply, but I guess we'll never know who they were.",
               type : "neutral",
               effect : "None"
        },
        2 : {  func : walletChange.bind(null, -.1),
               outcome : "Captain, our warning shot accidentally hit their shields! They've returned fire and melted our phasers right through our shields! I think they even teleported our torpedos out of their tubes and into space. We can make repairs but it'll take time and cost money; luckily, they seem to be resuming their course at high speed. We've received a message as well, Captain. The computer's translation approximates it to be 'LATER, JERKS'.",
               type : "bad",
               effect : "Lost 10% cash"
        }
    },
    isHappening : false,
    hasHappened : false
};

// Strange ship 2 (allies in distress)
incidents[2] = {
    title : "Captain, there's an unknown vessel approaching, broadcasting a distress signal on all frequencies.",
    difficulty : 1,
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
        "Something's fishy here. Let's wait a few minutes and continue scanning their systems. If they're not lying, their engine core should overheat shortly, and we can move in and evacuate. If they are lying or turn hostile, detonate their core with a phaser blast."
    ],
    rewards : {
        0 : {  func : walletChange.bind(null, 1000),
               outcome : "Ridiculous. They had their manifolds set to minimum and their ionization compensator set to 80 percent, what a bunch of dummies! Our engineers pushed a few buttons and sent them on their way. They paid us well for our time though, probably out of embarassment.",
               type : "good",
               effect : "Gained 1000 cash"
        },
        1 : {  func : fuelChange.bind(null, 1),
               outcome : "We were able to identify the trouble and Engineering beamed over some parts, but when they powered up their teleporter to receive the parts, their electrical systems shorted out. Life support started failing so we beamed the crew of twelve aboard immediately, and their ship exploded shortly thereafter. They didn't seem too upset, apparently it was a rental, and they plan to leave at the next port. At least we salvaged one unit of fuel from their wreckage.",
               type : "good",
               effect : "Gained 1 fuel"
        },
        2 : {  func : nothingHappened,
               outcome : "Sensors indicate they're low on fuel and oxygen. There's minor radiation all over the ship but levels increase closer to the engineering section, peaking at levels of WHOA they just exploded. I think we waited too long to help, Captain. We should probably just move along now...",
               type : "neutral",
               effect : "None"
        }
    },
    isHappening : false,
    hasHappened : false
};

// Strange ship 3 (pirates in disguise)
incidents[3] = {
    title : "Captain, a small ship is approaching with no interplanetary registration markings.",
    difficulty : 1,
    description : "Their engines are offline and they're only moving due to their existing momentum. Comms are unresponsive. " +
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
    rewards : {
        0 : {  func : walletChange.bind(this, "bankrupt"),
               outcome : "Captain, please don't be mad. The ship didn't reply to our hails, so we sent an away team like you ordered, with security and everything. So, they got on board, went to the cargo hold, and then they found some bodies in stasis. That's kind of where everything went wrong. When they woke up, the ship's crew activated security protocols, which deactivated our security team's weapons, and took our team hostage with a bunch of improvised weapons. Turns out they're escaped prisoners, and they want all our cash for the return of our away team.",
               type : "bad",
               effect : "Lost all cash"
        },
        1 : {  func : walletChange.bind(this, -1000),
               outcome : "Oh boy, that didn't go well. Ah, Captain, the crew of the ship wasn't in stasis, or injured, they were masking their life signs with portable biorhythmic dampeners. They tried to take the medical crew hostage, but the salvage crew fought back, and then security joined in, and well, basically everyone got shot. Also, the airlock control got shot, and their ship forcably ejected away from ours. We lost the medics, the salvage team, and the security force, but worst of all, the airlock door cost 1000 cash to repair.",
               type : "bad",
               effect : "Lost 1000 cash"
        },
        2 : {  func : walletChange.bind(this, "rando"),
               outcome : "We did just what you said, and after the air vented from the ship we sent an away team to investigate. Turns out they were escaped inmates from a penal colony on a nearby moon. Looks like they ran out of supplies a few days into their escape and went into stasis to wait for a ship to rescue them, presumably planning to hijack it and continue their escape. Good thing we shot first and asked questions much, much later, Captain. We got a good haul from that one.",
               type : "good",
               effect : "Gained random amount of cash"
        }
    },
    isHappening : false,
    hasHappened : false
};

// Derelict ship 1 (supply ship)
incidents[4] = {
    title : "Captain, derelict ship ahead. Freighter class, no life signs detected.",
    difficulty : 1,
    description : "Sensors detect damage to the starboard engine and surrounding hull. Engineering says it looks like a mid-flight collision, they're not sure with what though. " +
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
    rewards : {
        0 : {  func : gotRandomGoods,
               outcome : "Loot secured, Captain! We found some good stuff, we even brought back some movies and books from their library. Dobson found some logs about an experimental asteroid mining procedure, but it was boring stuff so we grabbed some old episodes of Matlock instead.",
               type : "good",
               effect : "Got random loot"
        },
        1 : {  func : walletChange.bind(this, "rando"),
               outcome : "Most of the stuff sucked out into space was miscellaneous mining equipment, just parts really. Engineering said they could sell some of it next time a peddler probe comes by. Oh, here's one now! Aaaaand.... Sold.",
               type : "good",
               effect : "Gained random amount of cash"
        },
        2 : {  func : nothingHappened,
               outcome : "Probably a good call, Captain. Never hurts to play it safe. Kind of boring though, right?",
               type : "neutral",
               effect : "None"
        }
    },
    isHappening : false,
    hasHappened : false
};

// Derelict ship 2 (evil science ship)
incidents[5] = {
    title : "Captain, derelict sighted in the distance.",
    difficulty : 1,
    description : "Scanners show no humanoid lifesigns, though we do see readings that " +
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
    rewards : {
        0 : {  func : fuelChange.bind(null, 5),
               outcome : "Our Science team recovered some logs from the ship's databanks. Seems it was a Research vessel trying to breed sentient plants that could grow in any conditions. The plants decided to take over the ship, and the interior of the ship is now covered in vegetation. It doesn't seem hostile, but without hazard suits, the oxygen levels would be poisonous. That's probably what killed the crew. The Science team was able to salvage some extra fuel, though!",
               type : "good",
               effect : "Got 5 fuel"
        },
        1 : {  func : cargoCapDoubled,
               outcome : "The entire vessel was lined with vegetation, but the Security team was able to activate flame turrets around the ship, incinerating all the plants. After they shot all the ashes out into space, the Engineering team was able to cut one of the domes off the ship and attach it to our stern! Now our cargo hold is HUGE!",
               type : "good",
               effect : "Cargo capactiy doubled!"
        },
        2 : {  func : nothingHappened,
               outcome : "You were right captain, we read 125 corpses in the entire ship, oxygen levels at 500% the lethal limit for humans. Looks like some kind of vegetation escaped the domes and took over the ship, overloading the oxygen scrubbers and asphyxiating the crew. Yikes.",
               type : "neutral",
               effect : "None"
        }
    },
    isHappening : false,
    hasHappened : false
};

// Asteroid field
incidents[6] = {
    title : "Asteroid field ahead, Captain.",
    difficulty : 1,
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
    rewards : {
        0 : {  func : fuelChange.bind(null, -2),
               outcome : "The nebula didn't cause any damage but we got turned around a little. We spent some extra fuel and time fixing our course, but we're no worse for wear.",
               type : "bad",
               effect : "Lost 2 fuel"
        },
        1 : {  func : walletChange.bind(this, -200),
               outcome : "That was AWESOME-- uh, sorry Captain, sir. We took a few bumps but repairs will be cheap, and our Pilot got to do some sweet barrel rolls. You're the best, Captain.",
               type : "bad",
               effect : "Lost 200 cash"
        },
        2 : {  func : walletChange.bind(this, "half"),
               outcome : "Ugh, Captain, that radiation was a type we've never experienced before. The effects were more severe than we anticipated. Dobson is still sick but we've mostly recovered, med supplies weren't cheap though.",
               type : "bad",
               effect : "Lost half our cash"
        }
    },
    isHappening : false,
    hasHappened : false
};

// Nebula ahead
incidents[7] = {
    title : "Captain, there's a gaseous nebula directly in our path.",
    difficulty : 1,
    description : "It's a few aU's in length captain, there's no way we can go around. " +
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
    rewards : {
        0 : {  func : fuelChange.bind(null, -1),
               outcome : "Captain, we did get through quickly, but we had to use twice as much fuel as projected. But the engine intakes couldn't handle the rapid influx of dust and gasses, they got pretty clogged up, and the shields overloaded a little in the aft sections but we recovered quickly. Repairs were minor, but we had to buy parts from a nearby outpost moon.",
               type : "bad",
               effect : "Lost 1 fuel"
        },
        1 : {  func : walletChange.bind(this, "rando"),
               outcome : "Whew, that was tense. Sensors malfunctioned in just about every possible way but we maintained course and got through unscathed. We also found some wreckage within the nebula, and retrieved it with the tractor beam. Looks valuable to me, but what do I know.",
               type : "good",
               effect : "Got random amount of cash"
        },
        2 : {  func : walletChange.bind(this, -1000),
               outcome : "We coasted through without incident, Captain. Our ship needs all the dust and crap washed off of it, but we can handle that in the next port. We lost some time by travelling under momentum instead of propulsion though, so we were a little late to port, and we needed to get our ship registration renewed a few days ago. There was, shall we say, a late fee.",
               type : "bad",
               effect : "Lost 1000 cash"
        }
    },
    isHappening : false,
    hasHappened : false
};

// Wormhole spotted
incidents[8] = {
    title : "Wormhole sighted, Captain!",
    difficulty : 1,
    description : "We detected an energy fluctuation dead ahead, and just as " +
                  "our ship decelerated this crazy wormhole opened up! What should " +
                  "we do, Captain? We can go through it and end up who knows where, " +
                  "or stay here and take some readings before we move on. Or, we can just " +
                  "drop a beacon and log it on our charts before resuming course.",
    alternatives : [
        "It's kind of intriguing though, right? A door to anywhere, and we can just fly right in.",
        "Without knowing where we're going to end up though, I'd suggest we steer clear of it, whatever you decide.",
        "Most wormholes are unstable though, we may never get another chance to see one again. I say we cowboy up and head on in!",
    ],
    choices : [
        "Stow your gear and hang on tight, we're going to find out where this leads. Full speed ahead!",
        "Let's send in a Class 1 probe, set it for automatic return in ten minutes, then we're on our way. I'm not risking this ship and its crew for some nerdy research joyride.",
        "Nope! I've seen enough movies to know that wormholes never take you somewhere good. Steady as she goes, let's float right on by."
    ],
    outcomes : [
        
        
        
    ],
    rewards : {
        0 : {  func : nothingHappened,
               outcome : "Um, we seem to be exactly where we were when we entered the wormhole, Captain, just facing the opposite direction. Also, our clothes are on backwards. Interesting.",
               type : "neutral",
               effect : "Backwards clothes"
        },
        1 : {  func : lostRandomGoods,
               outcome : "Captain, you're not going to believe this. We launched the probe like you ordered, and ten minutes later it came flying out of the wormhole WAY faster than we programmed it to, and it crashed right through the docking bay doors. We fixed everything, but Dobson is dead, and the probe's completely destroyed so we don't even know where it went. Also, we lost some cargo. I blame Dobson.",
               type : "good",
               effect : "Got random amount of cash"
        },
        2 : {  func : nothingHappened,
               outcome : "Captain! We tried to coast by but something came out of the wormhole right in our path! It ripped through the hull and grabbed Dobson! The security cameras only caught a few frames, but it looked like a giant tentacle! That's CRAZY! And sad, about Dobson.",
               type : "neutral",
               effect : "Dobson died. Meh."
        }
    },
    isHappening : false,
    hasHappened : false
};

// Future self encounter
incidents[9] = {
    title : "Ah, Captain? We seem to be receiving hails from... ourselves.",
    difficulty : 1,
    description : "I'm really not sure what's going on, Captain. That looks like " +
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
    rewards : {
        0 : {  func : nothingHappened,
               outcome : "Captain, that was the craziest idea ever. I'm not sure who that ship was, or if anyone was really following us, but we've lost them both. Also, everyone on board threw up except for you.",
               type : "bad",
               effect : "Everyone threw up (except for you)"
        },
        1 : {  func : lostRandomGoods,
               outcome : "Whoa, Captain, that ship that looked like us flew away as we powered up our engines. We climbed up to warp speed and suddenly hit an energy rift of some kind, causing mild damage to our ship. We're close to our last coordinates, and we're only able to activate the Morse transmitter, I suggest we travel there and warn ourselves immediately. Hopefully we do better next time.",
               type : "neutral",
               effect : "Deja vu"
        },
        2 : {  func : nothingHappened,
               outcome : "Captain, we were being followed by freaky space pirates! They attacked as soon as they caught up with us, but with the combined firepower of our ship and the other mirror universe bizarro version of our ship, we totally kicked the crap out of them! That was so crazy! The other us flew off after the battle, and even though it'd be awesome, I don't think we should follow them.",
               type : "good",
               effect : "Confidence boost. And Dobson's here! I thought he was dead! Weird, right?"
        }
    },
    isHappening : false,
    hasHappened : false
};