import { BaseStat } from './BaseStat.js';
import chalk from 'chalk';

// 몬스터 클래스
export class Monster extends BaseStat {
  constructor(name, hp, damage, defence, agility) {
    super(name, hp, damage, defence, agility);
    this.isBoss = false;
    this.exp = 10;
  }

  // 몬스터 데미지 받는 로직
  takeDamage(value) {
    let calculateDamge = value - this._defence;

    let resultDamage = calculateDamge <= 0 ? 0 : calculateDamge;

    let randomInit = parseInt(Math.random() * 100) + 1;

    if (randomInit < this._agility) {
      return (
        chalk.redBright(`${this.name}`) +
        chalk.whiteBright(`(이)가`) +
        chalk.greenBright(` 플레이어`) +
        chalk.whiteBright(`의 공격을 회피했습니다.`) +
        chalk.redBright(`(남은체력: ${this._hp})`)
      );
    } else {
      this.hp -= resultDamage;
      return (
        chalk.red(`${this.name}`) +
        chalk.whiteBright(`(이)가 `) +
        chalk.greenBright(`${resultDamage}`) +
        chalk.whiteBright(`의 데미지를 받았습니다.`) +
        chalk.redBright(`(남은체력: ${this._hp})`)
      );
    }
  }
}
