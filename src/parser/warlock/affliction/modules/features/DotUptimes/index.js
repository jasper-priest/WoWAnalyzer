import React from 'react';

import Analyzer from 'parser/core/Analyzer';

import StatisticsListBox, { STATISTIC_ORDER } from 'interface/others/StatisticsListBox';

import AgonyUptime from './AgonyUptime';
import CorruptionUptime from './CorruptionUptime';
import UnstableAfflictionUptime from './UnstableAfflictionUptime';
import StatisticGroup from 'interface/statistics/StatisticGroup';
import StatisticBar from 'interface/statistics/StatisticBar';
import SiphonLifeUptime from '../../talents/SiphonLifeUptime';

class DotUptimeStatisticBox extends Analyzer {
  static dependencies = {
    agonyUptime: AgonyUptime,
    corruptionUptime: CorruptionUptime,
    unstableAfflictionUptime: UnstableAfflictionUptime,
    siphonLifeUptime: SiphonLifeUptime,
  };

  statistic() {
    return (
      <StatisticBar
        wide
        position={STATISTIC_ORDER.CORE(3)}
      >
        {this.agonyUptime.subStatistic()}
        {this.corruptionUptime.subStatistic()}
        {this.unstableAfflictionUptime.subStatistic()}
        {this.siphonLifeUptime.active && this.siphonLifeUptime.subStatistic()}
      </StatisticBar>
    );
  }
}

export default DotUptimeStatisticBox;
