import React from 'react';

import Analyzer, { SELECTED_PLAYER } from 'parser/core/Analyzer';
import Events from 'parser/core/Events';
import StatTracker from 'parser/shared/modules/StatTracker';
import calculateBonusAzeriteDamage from 'parser/core/calculateBonusAzeriteDamage';

import SPELLS from 'common/SPELLS';
import { calculateAzeriteEffects } from 'common/stats';
import { formatThousands, formatNumber, formatPercentage } from 'common/format';

import TraitStatisticBox from 'interface/others/TraitStatisticBox';
import ItemDamageDone from 'interface/others/ItemDamageDone';
import AzeritePowerStatistic from 'interface/statistics/AzeritePowerStatistic';
import BoringSpellValueText from 'interface/statistics/components/BoringSpellValueText';
import BoringSpellValue from 'interface/statistics/components/BoringSpellValue';

const AGONY_SP_COEFFICIENT = 0.008; // taken from Simcraft SpellDataDump

/*
    Sudden Onset
      Agony deals up to an additional X damage and starts with 4 stacks.
 */
class SuddenOnset extends Analyzer {
  static dependencies = {
    statTracker: StatTracker,
  };

  traitBonus = 0;
  damage = 0;

  constructor(...args) {
    super(...args);
    this.active = this.selectedCombatant.hasTrait(SPELLS.SUDDEN_ONSET.id);
    if (!this.active) {
      return;
    }
    this.traitBonus = this.selectedCombatant.traitsBySpellId[SPELLS.SUDDEN_ONSET.id].reduce((total, rank) => {
      const [ damage ] = calculateAzeriteEffects(SPELLS.SUDDEN_ONSET.id, rank);
      return total + damage;
    }, 0);

    this.addEventListener(Events.damage.by(SELECTED_PLAYER).spell(SPELLS.AGONY), this.onAgonyDamage);
  }

  onAgonyDamage(event) {
    const [ bonusDamage ] = calculateBonusAzeriteDamage(event, [this.traitBonus], AGONY_SP_COEFFICIENT, this.statTracker.currentIntellectRating);
    this.damage += bonusDamage;
  }

  statistic() {
    /*<TraitStatisticBox
      trait={SPELLS.SUDDEN_ONSET.id}
      value={<ItemDamageDone amount={this.damage} approximate />}
      tooltip={(
        <>
          Estimated bonus Agony damage: {formatThousands(this.damage)}<br /><br />

          The damage is an approximation using current Intellect values at given time. Note that this estimate does NOT take into account the increased initial stacks, just the bonus damage.
          Also, because we might miss some Intellect buffs (e.g. trinkets, traits), the value of current Intellect might be also little incorrect.
        </>
      )}
    />*/

    /*<BoringSpellValueText spell={SPELLS.SUDDEN_ONSET}>
        <SwordIcon /> ≈ {formatNumber(this.damage / this.owner.fightDuration * 1000)} DPS <small>({formatPercentage(this.owner.getPercentageOfTotalDamageDone(this.damage))} %)</small>
      </BoringSpellValueText>*/
    /*<BoringSpellValue
      spell={SPELLS.SUDDEN_ONSET}
      value={`≈ ${formatNumber(this.damage / this.owner.fightDuration * 1000)} DPS`}
      label={`(${formatPercentage(this.owner.getPercentageOfTotalDamageDone(this.damage))} % of total)`}
    />*/
    const SwordIcon = () => (
      <img
        src="/img/sword.png"
        alt="Damage"
        className="icon"
      />
    );
    return (
      <AzeritePowerStatistic
        size="small"
        tooltip={(
          <>
            Estimated bonus Agony damage: {formatThousands(this.damage)}<br /><br />

            The damage is an approximation using current Intellect values at given time. Note that this estimate does NOT take into account the increased initial stacks, just the bonus damage.
            Also, because we might miss some Intellect buffs (e.g. trinkets, traits), the value of current Intellect might be also little incorrect.
          </>
        )}
      >
        <BoringSpellValueText spell={SPELLS.SUDDEN_ONSET}>
          <span style={{ fontSize: '29px' }}>
            ≈ {formatNumber(this.damage / this.owner.fightDuration * 1000)} DPS <small>({formatPercentage(this.owner.getPercentageOfTotalDamageDone(this.damage))} % of total)</small>
          </span>
        </BoringSpellValueText>
      </AzeritePowerStatistic>
    );
  }
}

export default SuddenOnset;
