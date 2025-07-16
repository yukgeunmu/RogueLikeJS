import { BaseStat } from './BaseStat.js';
import chalk from 'chalk';

export class Monster extends BaseStat {
  constructor(name, hp, maxHp, damage, defence, agility) {
    super(name, hp, maxHp, damage, defence, agility);
    this.buffs = [];
    this.deBuffs = [];
  }

  takeDamage(value) {
    let calculateDamge = value - this._defence;

    let resultDamage = calculateDamge <= 0 ? 0 : calculateDamge;

    let randomInit = parseInt(Math.random() * 100) + 1;

    if (randomInit < this._agility) {
      return chalk.red(
        `플레이어의 공격을 회피했습니다.(남은체력: ${this._hp})`
      );
    } else {
      this.hp -= resultDamage;
      return chalk.red(
        `${this.name}가 ${resultDamage}의 데미지를 받았습니다.(남은체력: ${this._hp})`
      );
    }
  }

  startTurn() {}

  endTurn(logs) {
    if (this.deBuffs === 0) return;

    for (let i = this.deBuffs.length - 1; i >= 0; i--) {
      this.deBuffs[i].duration--;
      logs.push(this.deBuffs[i].usingSkill.apply(this,this.deBuffs[i].skillData));
      if (this.deBuffs[i].duration <= 0) {
        this.deBuffs[i].usingSkill.remove(this, this.deBuffs[i].skillData);
        this.deBuffs[i].duration = this.deBuffs[i].IntiDuration;
        this.deBuffs.splice(i, 1);
      }
    }

    return logs;
  }
}
