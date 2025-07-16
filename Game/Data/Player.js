import { BaseStat } from './BaseStat.js';
import chalk from 'chalk';

export class Player extends BaseStat {
  constructor(name, hp, maxHp, damage, defence, agility) {
    super(name, hp, maxHp, damage, defence, agility);
    this.buffs = [];
    this.deBuffs = [];
    this.curDefence = defence;
    this.curDamage = damage;
    this.curAgility = agility;
    this.curMaxHp = maxHp;
  }

  takeDamage(monster) {
    let calculateDamge = monster.damage - this._defence;

    let resultDamage = calculateDamge <= 0 ? 0 : calculateDamge;

    let randomInit = parseInt(Math.random() * 100) + 1;

    if (randomInit < this._agility) {
      return chalk.green(
        `${monster.name}의 공격을 회피했습니다.(남은체력: ${this._hp})`
      );
    } else {
      this.hp -= resultDamage;
      return chalk.green(
        `플레이어가 ${monster.name}에게 ${resultDamage}의 데미지를 받았습니다.(남은체력: ${this._hp})`
      );
    }
  }

  LevelUp(stage) {
    this.maxHp = this._maxHp + (stage - 1) + 10;
    this._damage = this._damage + (stage - 1) + 10;
    this._defence = this._defence + (stage - 1) + 1;
    this._agility = this._agility + (stage - 1) + 1;

    this._hp = this._maxHp;
  }

  InitData() {
    this.hp = this.maxHp;
    this.buffs = [];
    this.deBuffs = [];
    this.damage = this.curDamage;
    this.maxHp = this.curMaxHp;
    this.defence = this.curDefence;
    this.agility = this.curAgility;
  }

  startTurn() {}

  endTurn(logs) {
    if (this.buffs.length === 0) return;

    for (let i = this.buffs.length - 1; i >= 0; i--) {
      this.buffs[i].duration--;
      if (this.buffs[i].duration <= 0) {
        logs.push(this.buffs[i].usingSkill.remove(this, this.buffs[i].skillData));
        this.buffs[i].duration = this.buffs[i].IntiDuration;
        this.buffs.splice(i, 1);
      }
    }
  }
}
