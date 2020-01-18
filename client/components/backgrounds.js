const ACOLYTE = {
    name: "Acolyte",
    mustHaves: ["constitution", "wisdom"],
    description: "You spent your early days in a religious monastery or cloister. You may have traveled out into the world to spread the message of your religion or because you cast away the teachings of your faith, but deep inside you’ll always carry the lessons you learned."
}

const ACROBAT = {
    name: "Acrobat",
    mustHaves: [ "strength","dexterity"],
    description: "In a circus or on the streets, you earned your pay by performing as an acrobat. You might have turned to adventuring when the money dried up, or when you learned to put skills to better use."
}

const ANIMALWHISPERER = {
    name: "Animal Whisperer",
    mustHaves: ["wisdom","charisma"],
    description: "You have always felt a connection to animals, and it was only a small leap to learn to train them. As you travel, you continuously encounter different creatures, befriending them along the way."
}

const BARKEEP = {
    name: "Barkeep",
    mustHaves: ["constitution","charisma"],
    description: "You have five specialties: hefting barrels, polishing steins, drinking, drinking, and drinking. You ran or worked in a bar, where you learned how to hold your liquor and rowdily socialize."
}

const BLACKSMITH = {
    name: "Blacksmith",
    mustHaves: ["strength", "intelligence"],
    description: "You were a blacksmith or a blacksmith’s apprentice, and during countless hours toiling at the forge, you learned how to smith armor and weapons. Perhaps you worked hard each day and dreamed of adventure each night, or perhaps the adventuring life was thrust upon you by a pivotal event."
}

const CRIMINAL = {
    name: "Criminal",
    mustHaves: ["dexterity","intelligence"],
    description: "As an unscrupulous independent or as a member of an underworld organization, you lived a life of crime. You might have become an adventurer to seek redemption, to escape the law, or simply to get access to bigger and better loot."
}

const ENTERTAINER = {
    name: "Entertainer",
    mustHaves: ["dexterity","charisma"],
    description: "Through an education in the arts or sheer, dogged practice, you learned to entertain crowds. You might have been an actor, a dancer, a musician, a magician, or any other sort of performer."
}

const FARMHAND = {
    name: "Farmhand",
    mustHaves: ["constitution","wisdom"],
    description: "With a strong back and an understanding of seasonal cycles, you tilled the land and tended crops. Your farm could have been razed by invaders, you could have lost the family tying you to the land, or you might have simply tired of the drudgery, but at some point you became an adventurer."
}

const GLADIATOR = {
    name: "Farmhand",
    mustHaves: ["strength","charisma"],
    description: "The bloody games of the arena taught you the art of combat.  Before you attained true fame, you departed—or escaped—the arena to explore the world. Your skill at drawing both blood and a crowd’s attention pay off in a new adventuring life."
}

const HUNTER = {
    name: "Hunter",
    mustHaves: ["dexterity","wisdom"],
    description: "You stalk and take down animals and other creatures of the wild. Skinning animals, harvesting their flesh, and cooking them were also part of your training, all of which can give you useful resources while you adventure."
}

const LABORER = {
    name: "Laborer",
    mustHaves: ["strength","constitution"],
    description: "You have spent years performing arduous physical labor, perhaps against your will. It was a difficult life, but you somehow survived. You may have embraced adventuring as an easier method to make your way in the world, or you might adventure under someone else’s command."
}

const MERCHANT = {
    name: "Merchant",
    mustHaves: ["intelligence", "charisma"],
    description: "In a dusty shop, market stall, or merchant caravan, you bartered wares for coin and trade goods. The skills you picked up still apply in the adventuring life, in which a deal on a suit of armor could save your life."
}

const NOBLE = {
    name: "Noble",
    mustHaves: ["intelligence", "charisma"],
    description: "To the common folk, the life of a noble seems one of idyllic luxury, but growing up as a noble or member of the aspiring gentry, you know the reality: a noble’s lot is obligation and intrigue. Whether you seek to escape your duties by adventuring or to thereby better your station, you have traded silks and pageantry for an adventurer’s life."
}

const NOMAD = {
    name: "Nomad",
    mustHaves: ["constitution", "wisdom"],
    description: "Traveling far and wide, you picked up basic tactics for surviving on the road and in unknown lands, getting by with few supplies and even fewer comforts. As an adventurer, you travel still, often into even more dangerous places."
}

const SAILOR = {
    name: "Sailor",
    mustHaves: ["strength", "dexterity"],
    description: "You heard the call of the sea from a young age. Perhaps you signed onto a merchant’s vessel, joined the navy, or even fell in with a crew of pirates and scallywags."
}

const SCHOLAR = {
    name: "Scholar",
    mustHaves: ["intelligence", "wisdom"],
    description: "You have a knack for learning, and from a young age, you sequestered yourself from the outside world to learn all that you could. You’ve read about so many wondrous places and things in your books, and you’ve always dreamed about one day seeing the real things. Eventually, that curiosity led you to leave your studies and become an adventurer"
}

const SCOUT = {
    name: "Scout",
    mustHaves: ["dexterity", "wisdom"],
    description: "You called the wilderness home as you hunted game, found trails, and guided travelers. Your wanderlust could have called you to the adventuring life, or perhaps you were serving as a scout for soldiers and found you liked battle."
}

const STREETURCHIN = {
    name: "Street Urchin",
    mustHaves: ["dexterity", "intelligence"],
    description: "You eked out a living by picking pockets on the streets of a major city, never knowing where you’d find your next meal. While some folk adventure for the glory, you adventure as a means of survival."
}

const WARRIOR = {
    name: "Warrior",
    mustHaves: ["strength", "constitution"],
    description: "As a warrior in a tribe or a member of a militia or army, you waded into battle in your younger days. You might have wanted to break out from the regimented structure of these forces, or could have always been as independent a warrior as you are now."
}

export default {
    acolyte: ACOLYTE,
    acrobat: ACROBAT,
    barkeep: BARKEEP,
    entertainer: ENTERTAINER,
    criminal: CRIMINAL,
    animalwhisperer: ANIMALWHISPERER,
    blacksmith: BLACKSMITH,
    farmhand: FARMHAND,
    gladiator: GLADIATOR,
    hunter: HUNTER,
    laborer: LABORER,
    merchant: MERCHANT,
    noble: NOBLE,
    nomad: NOMAD,
    sailor: SAILOR,
    scholar: SCHOLAR,
    scout: SCOUT,
    streeturchin: STREETURCHIN,
    warrior: WARRIOR
}