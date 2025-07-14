import chalk from 'chalk';
import readlineSync from 'readline-sync';
import { startGame } from '../../game.js';
import { AchievementCount } from '../Achivement/AchivementList.js';
import { achievementType } from '../Enum/Enums.js';
import { Save, Load, DeleteSave } from '../../Server/SaveLoad.js';
import { SceneManager } from './SceneManager.js';
import { BattleManager } from './BattleManager.js';

export class InputManager {
  // 유저 입력을 받아 처리하는 함수
  static async handleUserInput() {
    console.log('입력:');
    const choice = readlineSync.question();

    switch (choice) {
      case '1':
        console.log(chalk.green('게임을 시작합니다.'));
        // 여기에서 새로운 게임 시작 로직을 구현
        await startGame();
        break;
      case '2':
        // 업적 확인하기
        SceneManager.displayAchievement();
        break;
      case '3':
        // 옵션 창
        SceneManager.displayOption();
        await InputManager.handleUserInputOption();
        break;
      case '4':
        console.log(chalk.red('게임을 종료합니다.'));
        // 게임 종료 로직을 구현
        process.exit(0); // 게임 종료
        break;
      default:
        console.log(chalk.red('올바른 선택을 하세요.'));
    }
  }
  // 배틀 씬
  static async battleUserInput(stage, player, monster) {
    let logs = [];
    let isResult = false;

    while (player.hp > 0) {
      console.clear();
      SceneManager.displayStatus(stage, player, monster);

      if (isResult) {
        logs.forEach((log) => console.log(log));
        await sleep(1000);
        return;
      } else logs.forEach((log) => console.log(log));

      console.log(
        chalk.green(
          `\n1. 공격한다 2. 도망친다.(5%) 3.연속 공격(25%), 4. 방어(55%)`
        )
      );
      console.log(chalk.green(`당신의 선택은?`));
      const choice = readlineSync.question('');

      // 플레이어의 선택에 따라 다음 행동 처리
      if (parseInt(choice) >= 1 && parseInt(choice) <= 4) {
        logs.push(chalk.blueBright(`${choice}를 선택하셨습니다.`));
      }

      switch (choice) {
        case '1':
          BattleManager.BasicAttack(player, monster, logs);
          break;
        case '2':
          let [str, isRun] = BattleManager.Run();
          if (isRun) {
            isResult = isRun;
            logs.push(chalk.green(str));
          } else {
            logs.push(chalk.red(str));
            logs.push(player.takeDamage(monster.damage));
          }
          break;
        case '3':
          BattleManager.DoubleAttack(player, monster, logs);
          break;
        case '4':
          BattleManager.DefenceMode(player, monster, logs);
          break;
        default:
          logs.push(chalk.red('올바른 선택을 하세요.'));
          break;
      }

      if (monster.hp <= 0) {
        AchievementCount(achievementType.kill);
        break;
      }
    }
  }

  static async handleUserInputOption() {
    console.log('입력:');
    const choice = readlineSync.question();

    switch (choice) {
      case '1':
        console.log(chalk.green('저장합니다.'));
        await Save();
        readlineSync.question();
        break;
      case '2':
        console.log(chalk.yellow('게임을 불러옵니다.'));
        await Load();
        readlineSync.question();
        break;
      case '3':
        console.log(chalk.blue('세이브 데이터를 삭제 합니다.'));
        await DeleteSave();
        readlineSync.question();
        break;
      case '4':
        console.log(chalk.blue('로비로 나갑니다'));
        return;
      default:
        console.log(chalk.red('올바른 선택을 하세요.'));
        break;
    }
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
