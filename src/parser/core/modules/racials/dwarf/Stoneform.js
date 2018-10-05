import React from 'react';
import Analyzer from 'parser/core/Analyzer';

import Combatants from 'parser/core/modules/Combatants';
import { formatNumber } from 'common/format';
import SPELLS from 'common/SPELLS';
import SpellIcon from 'common/SpellIcon';
import RACES from 'game/RACES';
import StatisticBox from 'interface/others/StatisticBox';

const STONEFORM_DAMAGE_REDUCTION = 0.1;
const FALLING_DAMAGE_ABILITY_ID = 3;
const PHYSICAL_EVENT_TYPE = 1;

class Stoneform extends Analyzer {
  static dependencies = {
    combatants: Combatants,
  };
  
  damageReduced = 0;
  physicalDamageTaken = 0;
  constructor(...args) {
    super(...args);
    this.active = this.selectedCombatant.race && this.selectedCombatant.race === RACES.Dwarf;
  }

  on_toPlayer_damage(event) {
    const spellId = event.ability.guid;
    if (spellId === FALLING_DAMAGE_ABILITY_ID) {
      return;
    }
    
    const damageTaken = event.amount + (event.absorbed || 0);
    const isStoneformActive = this.selectedCombatant.hasBuff(SPELLS.STONEFORM_BUFF.id, event.timestamp, this.owner.playerId);
    
    if (isStoneformActive && event.ability.type === PHYSICAL_EVENT_TYPE) { 
      //console.log(event);
      console.log("Damage taken: " + damageTaken);
      this.physicalDamageTaken += damageTaken;
      this.damageReduced += damageTaken / (1 - STONEFORM_DAMAGE_REDUCTION) * STONEFORM_DAMAGE_REDUCTION;
      console.log("Total reduction: " + this.damageReduced);
    }
  }

  statistic() {
    return(
      <StatisticBox
        icon={<SpellIcon id={SPELLS.STONEFORM_BUFF.id} />}
        value={`${formatNumber(this.damageReduced)}`}
        label="Stoneform Damage Reduced"
        tooltip={`Over the course of the encounter you took ${formatNumber(this.physicalDamageTaken)} physical damage while Stoneform was active`}
      />
    );

  }

}

export default Stoneform;