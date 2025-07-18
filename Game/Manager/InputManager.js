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
        break;
    }
  }
  // 배틀 인풋
  static async battleUserInput(stage, player, monsters, skills, dieMonsters) {
    let logs = [];
    let isResult = false;

    while (player.hp > 0) {
      console.clear();
      SceneManager.displayStatus(stage, player, monsters);

      if (isResult) {
        logs.forEach((log) => console.log(log));
        await sleep(2000);
        return;
      } else logs.forEach((log) => console.log(log));

      console.log(
        chalk.green(
          `\n1. 공격한다 2. 도망친다.(5%) 3.연속 공격(25%), 4. 스킬사용`
        )
      );
      console.log(chalk.green(`당신의 선택은?`));
      const choice = readlineSync.question('');
      logs.length = 0;

      // 플레이어의 선택에 따라 다음 행동 처리
      if (parseInt(choice) >= 1 && parseInt(choice) <= 4) {
        logs.push(chalk.blueBright(`${choice}를 선택하셨습니다.`));
      }

      // 플레이어 전투 방법 선택
      switch (choice) {
        case '1':
          BattleManager.BasicAttack(player, monsters, stage, logs);
          endPlay(player, monsters, logs);
          break;
        case '2':
          let [str, isRun] = BattleManager.Run();
          if (isRun) {
            isResult = isRun;
            logs.push(chalk.green(str));
          } else {
            logs.push(chalk.red(str));
            BattleManager.MonsterAttack(player, monsters, stage, logs);
          }
          break;
        case '3':
          BattleManager.DoubleAttack(player, monsters, stage, logs);
          endPlay(player, monsters, logs);
          break;
        case '4':
          BattleManager.SkillUse(player, monsters, skills, logs, stage);
          endPlay(player, monsters, logs);
          break;
        default:
          logs.push(chalk.red('올바른 선택을 하세요.'));
          break;
      }

      for (let i = monsters.length - 1; i >= 0; i--) {
        if (monsters[i].hp <= 0) {
          dieMonsters[monsters[i].name]++;
          monsters.splice(i, 1);
          AchievementCount(achievementType.kill);
        }
      }

      if (monsters.length <= 0) {
        break;
      }
    }
  }

  // 옵션 씬
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

  // 보상 씬
  static async rewardUserInput(player, total) {
    console.log('입력:');

    while (true) {
      const choice = readlineSync.question();

      switch (choice) {
        case '1':
          player.maxHp += total.hp;
          player.curMaxHp = player.maxHp;
          return console.log(chalk.green('체력이 상승했습니다.'));
        case '2':
          player.damage += total.damage;
          player.curDamage = player.damage;
          return console.log(chalk.green('공격력이 상승했습니다.'));
        case '3':
          player.defence += total.defence;
          player.curDefence = player.defence;
          return console.log(chalk.green('방어력이 상승했습니다.'));
        case '4':
          player.agility += total.agility;
          player.curAgility = player.agility;
          return console.log(chalk.green('회피율이 상승했습니다.'));
        default:
          console.log(chalk.red('올바른 선택을 하세요.'));
          break;
      }
    }
  }
}

// 도망 사용 시 시간 지연해주는 메서드
let sleep = function (ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

let endPlay = function (player, monsters, logs) {
  player.endTurn(logs);

  for (let i = 0; i < monsters.length; i++) {
    monsters[i].endTurn(logs);
  }
};
