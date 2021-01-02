import SPELLS from 'common/SPELLS';

export const ABILITIES_AFFECTED_BY_HEALING_INCREASES = [
  SPELLS.HOLY_SHOCK_HEAL.id,
  SPELLS.LIGHT_OF_DAWN_HEAL.id,
  SPELLS.FLASH_OF_LIGHT.id,
  SPELLS.JUDGMENT_OF_LIGHT_HEAL.id,
  SPELLS.LIGHT_OF_THE_MARTYR.id,
  SPELLS.LIGHTS_HAMMER_HEAL.id,
  SPELLS.HOLY_PRISM_HEAL.id,
  SPELLS.HOLY_PRISM_HEAL_DIRECT.id,
  SPELLS.AURA_OF_MERCY_HEAL.id,
  // While the following spells don't double dip in healing increases, they gain the same percentual bonus from the transfer
  SPELLS.BEACON_OF_LIGHT_HEAL.id,
  SPELLS.LEECH.id,

  // There trinkets are confirmed to also be increased:
  // Proof: https://www.warcraftlogs.com/reports/4AVZqJTgyhG2F368/#fight=46&source=4&view=events&pins=2%24Off%24%23244F4B%24auras-gained%24-1%240.0.0.Any%240.0.0.Any%24true%240.0.0.Any%24true%24216331%24true%24true see the events at 00:03:39.013 and 00:03:40.369.
  SPELLS.AVENGING_CRUSADER_HEAL_NORMAL.id,
  SPELLS.AVENGING_CRUSADER_HEAL_CRIT.id,
  271682, // Harmonious Chord - https://www.warcraftlogs.com/reports/cXnPABVbLjk68qyM#fight=6&type=healing&source=10&ability=271682&view=events
];

// TODO: Feed this with the SpellInfo config
export const ABILITIES_AFFECTED_BY_MASTERY = [
  SPELLS.HOLY_SHOCK_HEAL.id,
  SPELLS.LIGHT_OF_DAWN_HEAL.id,
  SPELLS.HOLY_LIGHT.id,
  SPELLS.FLASH_OF_LIGHT.id,
  SPELLS.LIGHT_OF_THE_MARTYR.id,
  SPELLS.HOLY_PRISM_HEAL.id,
  SPELLS.HOLY_PRISM_HEAL_DIRECT.id,
  SPELLS.LIGHTS_HAMMER_HEAL.id,
  SPELLS.JUDGMENT_OF_LIGHT_HEAL.id,
  SPELLS.BESTOW_FAITH_TALENT.id,
  SPELLS.GLIMMER_OF_LIGHT_HEAL_TALENT.id,
  SPELLS.SHOCK_BARRIER.id,
  SPELLS.ASHEN_HALLOW_HEAL.id,
];

export const BEACON_TRANSFERING_ABILITIES = {
  [SPELLS.HOLY_SHOCK_HEAL.id]: 1,
  [SPELLS.LIGHT_OF_DAWN_HEAL.id]: 0.5,
  [SPELLS.HOLY_LIGHT.id]: 1,
  [SPELLS.FLASH_OF_LIGHT.id]: 1,
  [SPELLS.HOLY_PRISM_HEAL.id]: 0.5,
  [SPELLS.HOLY_PRISM_HEAL_DIRECT.id]: 1,
  [SPELLS.LIGHTS_HAMMER_HEAL.id]: 0.5,
  [SPELLS.BESTOW_FAITH_TALENT.id]: 1,
  [SPELLS.AVENGING_CRUSADER_HEAL_NORMAL.id]: 1,
  [SPELLS.AVENGING_CRUSADER_HEAL_CRIT.id]: 1,
  [SPELLS.GLIMMER_OF_LIGHT_HEAL_TALENT.id]: 0.25,
};

export const BEACON_TYPES = {
  BEACON_OF_FATH: SPELLS.BEACON_OF_FAITH_TALENT.id,
  DIVINE_PURPOSE_TALENT: SPELLS.BEACON_OF_LIGHT_CAST_AND_BUFF.id,
  BEACON_OF_VIRTUE: SPELLS.BEACON_OF_VIRTUE_TALENT.id,
};
export const NUM_BEACONS = {
  [SPELLS.BEACON_OF_FAITH_TALENT.id]: 2,
  [SPELLS.DIVINE_PURPOSE_TALENT.id]: 1,
  [SPELLS.BEACON_OF_VIRTUE_TALENT.id]: 4,
};
