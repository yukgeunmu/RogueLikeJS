import { BaseStat } from './BaseStat.js';
import chalk from 'chalk';
import { AchievementCount } from '../Achivement/AchivementList.js';
import { achievementType } from '../Enum/Enums.js';

// 플레이어 클래스
export class Player extends BaseStat {
  constructor(name, hp, damage, defence, agility) {
    super(name, hp, damage, defence, agility);
    this.curDefence = defence;
    this.curDamage = damage;
    this.curAgility = agility;
    this.curMaxHp = this.maxHp;

    this.level = 1;
    this.exp = 0;
    this.maxExp = 100;
  }

  // 플레이어 데미지 받는 로직
  takeDamage(monster) {
    let calculateDamge = monster.damage - this._defence;

    let resultDamage = calculateDamge <= 0 ? 0 : calculateDamge;

    let randomInit = parseInt(Math.random() * 100) + 1;

    if (randomInit < this._agility) {
      AchievementCount(achievementType.dodge);
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

  gainExp(amount) {
    this.exp += amount;
    console.log(chalk.yellowBright(`${amount}의 경험치를 획득했습니다. (현재 EXP: ${this.exp}/${this.maxExp})`));

    while (this.exp >= this.maxExp) {
      this.levelUp();
    }
  }

  levelUp() {
    this.exp -= this.maxExp;
    this.level++;
    this.maxExp = this.level * 100;

    console.log(chalk.cyanBright.bold(`레벨업! Lvl ${this.level}이 되었습니다!`));

    // Increase stats
    const hpUp = 10;
    const damageUp = 5;
    const defenceUp = 2;
    const agilityUp = 1;

    this.maxHp += hpUp;
    this.curMaxHp += hpUp;

    this.damage += damageUp;
    this.curDamage += damageUp;

    this.defence += defenceUp;
    this.curDefence += defenceUp;

    this.agility += agilityUp;
    this.curAgility += agilityUp;

    // Heal to full
    this.hp = this.maxHp;

    // console.log(chalk.green(`최대 체력 +${hpUp}, 공격력 +${damageUp}, 방어력 +${defenceUp}, 민첩 +${agilityUp}`));
    console.log(chalk.green(`체력을 모두 회복했습니다.`));
  }

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