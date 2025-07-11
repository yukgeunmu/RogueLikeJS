import { BaseStat } from './BaseStat.js';
import chalk from 'chalk';

export class Player extends BaseStat {

  takeDamage(value) {
    let calculateDamge = value - this._defence;

    let resultDamage = calculateDamge <= 0 ? 0 : calculateDamge;

    let randomInit = parseInt(Math.random() * 100) + 1;

    if (randomInit < this._Agility) {
      return chalk.green(
        `몬스터의 공격을 회피했습니다.(남은체력: ${this._hp})`
      );
    } else {
      this._hp -= resultDamage;
      return chalk.green(
        `플레이어가 ${resultDamage}의 데미지를 받았습니다.(남은체력: ${this._hp})`
      );
    }
  }
}
