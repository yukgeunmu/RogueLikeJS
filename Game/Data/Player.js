import { BaseStat } from './BaseStat.js';
import chalk from 'chalk';
import readlineSync from 'readline-sync';

// 플레이어 클래스
export class Player extends BaseStat {
  constructor(name, hp, damage, defence, agility) {
    super(name, hp, damage, defence, agility);
    this.curDefence = defence;
    this.curDamage = damage;
    this.curAgility = agility;
    this.curMaxHp = this.maxHp;
  }

  // 플레이어 데미지 받는 로직
  takeDamage(monster) {
    let calculateDamge = monster.damage - this._defence;

    let resultDamage = calculateDamge <= 0 ? 0 : calculateDamge;

    let randomInit = parseInt(Math.random() * 100) + 1;

    if (randomInit < this._agility) {
      return (
        chalk.redBright(`${monster.name}`) +
        chalk.whiteBright(`의 공격을 회피했습니다.`) +
        chalk.greenBright(`(남은체력: ${this._hp})`)
      );
    } else {
      this.hp -= resultDamage;
      return (
        chalk.greenBright(`플레이어`) +
        chalk.whiteBright(`(이)가 `) +
        chalk.redBright(`${monster.name}`) +
        chalk.whiteBright(`에게 `) +
        chalk.redBright(`${resultDamage}`) +
        chalk.whiteBright(`의 데미지를 받았습니다.`) +
        chalk.greenBright(`(남은체력: ${this._hp})`)
      );
    }
  }

  // 레벨업
  // LevelUp(stage) {
  //   this.maxHp = this._maxHp + (stage - 1) + 10;
  //   this._damage = this._damage + (stage - 1) + 10;
  //   this._defence = this._defence + (stage - 1) + 1;
  //   this._agility = this._agility + (stage - 1) + 1;

  //   this._hp = this._maxHp;
  // }

  //플레이더 전투 끝난 후 데이터 초기화 메서드
  InitData() {
    this.hp = this.maxHp;
    this.buffs = [];
    this.deBuffs = [];
    this.damage = this.curDamage;
    this.maxHp = this.curMaxHp;
    this.defence = this.curDefence;
    this.agility = this.curAgility;
  }
}
