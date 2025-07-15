import chalk from 'chalk';
import readlineSync from 'readline-sync';
import { SceneManager } from './SceneManager.js';


export class BattleManager {
  // 기본공격 로직
  static BasicAttack(player, monsters, logs) {
    SceneManager.displaySelectMonster(player, monsters);

    console.log(chalk.green(`당신의 선택은?`));
    const choice = readlineSync.question('');

    let selectedMonster = monsters[choice-1];

    if (!selectedMonster) {
      logs.push(chalk.red('올바른 선택을 하세요.'));
      return logs;
    }

    logs.push(selectedMonster.takeDamage(player.damage));

    for (let i = 1; i <= monsters.length; i++) {
      logs.push(player.takeDamage(monsters[i-1]));
    }

    return logs;
  }

  // 연속 공격 로직
  static DoubleAttack(player, monsters, logs) {
    
    let randomInit = parseInt(Math.random() * 100) + 1;

    if (randomInit <= 25) {
      logs.push(chalk.green('연속 공격에 성공하였습니다.'));

      for (let i = 0; i < monsters.length; i++) {
        logs.push(monsters[i].takeDamage(player.damage * 2));
      }
    } else {
      logs.push(chalk.red('연속 공격에 실패하였습니다.'));
      for (let i = 0; i < monsters.length; i++) {
        logs.push(player.takeDamage(monsters[i]));
      }
    }

    return logs;
  }

  // 방어 로직
  static DefenceMode(player, monster, logs) {
    let randomInit = parseInt(Math.random() * 100) + 1;

    if (randomInit <= 55) {
      logs.push(chalk.green('방어에 성공하였습니다.'));
      logs.push(player.takeDamage(0));
    } else {
      logs.push(chalk.red('방어에 실패하였습니다.'));
      logs.push(player.takeDamage(monster.damage));
    }

    return logs;
  }

  // 도망
  static Run() {
    let randomInit = parseInt(Math.random() * 100) + 1;
    let string;
    let isRun = false;

    if (randomInit <= 5) {
      string = '도망치는데 성공했습니다.';
      isRun = true;
    } else {
      string = '도망에 실패하였습니다.';
    }

    return [string, isRun];
  }
}
