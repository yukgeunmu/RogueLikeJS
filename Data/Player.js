import { BaseStat } from "./BaseStat.js";
import chalk from 'chalk';

export class Player extends BaseStat {

  attacked(value) {
    let randomInit = parseInt(Math.random() * 100) + 1;

    if (randomInit <= 70) {
      return chalk.green(`플레이어가 회피하였습니다.(남은체력: ${this._hp})`);
    } else {
      this._hp = this._hp - value;
      return chalk.red(
        `플레이어가 ${value}의 데미지를 받았습니다.(남은체력: ${this._hp})`
      );
    }
  }
}