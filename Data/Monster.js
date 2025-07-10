import { BaseStat } from './BaseStat.js';
import chalk from 'chalk';

export class Monster extends BaseStat {
  constructor(stage, hp, damage) {
    const calculateHp = hp * stage;
    const calculateDamge = damage * stage;
    super(calculateHp,calculateDamge);
  }

  attacked(value) {
    this._hp = this._hp - value;
    return chalk.magenta(
      `몬스터가 ${value}의 데미지를 받았습니다.(남은체력: ${this._hp})`
    );
  }
}
