import chalk from 'chalk';
import figlet from 'figlet';
import readlineSync from 'readline-sync';
import { startGame } from '../game.js';
import { Battle } from '../BattleLogic/Battle.js';
import { achievements, AchievementCount} from '../Achievement/AchievementList.js';
import { achievementType } from '../Enum/Enums.js';

export class SceneManager {
  // 로비 화면을 출력하는 함수
  static displayLobby() {
    console.clear();
    // 타이틀 텍스트
    console.log(
      chalk.cyan(
        figlet.textSync('RL- Javascript', {
          font: 'Standard',
          horizontalLayout: 'default',
          verticalLayout: 'default',
        })
      )
    );

    // 상단 경계선
    const line = chalk.magentaBright('='.repeat(50));
    console.log(line);

    // 게임 이름
    console.log(chalk.yellowBright.bold('CLI 게임에 오신것을 환영합니다!'));

    // 설명 텍스트
    console.log(chalk.green('옵션을 선택해주세요.'));
    console.log();

    // 옵션들
    console.log(chalk.blue('1.') + chalk.white(' 새로운 게임 시작'));
    console.log(chalk.blue('2.') + chalk.white(' 업적 확인하기'));
    console.log(chalk.blue('3.') + chalk.white(' 옵션'));
    console.log(chalk.blue('4.') + chalk.white(' 종료'));

    // 하단 경계선
    console.log(line);

    // 하단 설명
    console.log(chalk.gray('1-4 사이의 수를 입력한 뒤 엔터를 누르세요.'));
  }

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
        console.log(chalk.yellow('구현 준비중입니다.. 게임을 시작하세요'));
        // 업적 확인하기 로직을 구현
        achievement();
        break;
      case '3':
        console.log(chalk.blue('구현 준비중입니다.. 게임을 시작하세요'));
        readlineSync.question();
        // 옵션 메뉴 로직을 구현
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
  static battle = async (stage, player, monster) => {
    let logs = [];
    const BattleSelect = new Battle();

    while (player.hp > 0) {
      console.clear();
      displayStatus(stage, player, monster);

      logs.forEach((log) => console.log(log));

      console.log(
        chalk.green(`\n1. 공격한다 2. 도망친다. 3.연속 공격, 4. 방어`)
      );
      console.log(chalk.green(`당신의 선택은?`));
      const choice = readlineSync.question('');

      // 플레이어의 선택에 따라 다음 행동 처리
      logs.push(chalk.blueBright(`${choice}를 선택하셨습니다.`));

      switch (choice) {
        case '1':
          BattleSelect.BasicAttack(player, monster, logs);
          break;
        case '2':
          logs.push(chalk.green('도망쳤습니다.'));
          player.hp -= 10;
          return;
        case '3':
          BattleSelect.DoubleAttack(player, monster, logs);
          break;
        case '4':
          BattleSelect.DefenceMode(player, monster, logs);
          break;
      }

      if (monster.hp <= 0)
      {
        AchievementCount(achievementType.kill);
        break;
      } 
    }
  };
}


// 배틀 정보창
function displayStatus(stage, player, monster) {
  console.log(chalk.magentaBright(`\n=== Current Status ===`));
  console.log(
    chalk.cyanBright(`| Stage: ${stage} `) +
      chalk.blueBright(
        `| 플레이어 정보 체력: ${player.hp}, 공격력: ${player.damage} 방어력: ${player.defence} `
      ) +
      chalk.redBright(
        `| 몬스터 정보 체력: ${monster.hp}, 공격력: ${monster.damage} 방어력: ${monster.defence} |`
      )
  );
  console.log(chalk.magentaBright(`=====================\n`));
}

// 업적 씬
function achievement() {
  console.clear();
  console.log(
    chalk.cyan(
      figlet.textSync('Achievement', {
        font: 'Standard',
        horizontalLayout: 'default',
        verticalLayout: 'default',
      })
    )
  );

  // 상단 경계선
  const line = chalk.magentaBright('='.repeat(50));
  console.log(line);

  for (let i = 0; i < achievements.length; i++) {
    if (achievements[i].isTrue) {
      console.log(chalk.green(`${achievements[i].name}: ${achievements[i].description}`));
    } else {
       console.log(chalk.gray(`${achievements[i].name}: ${achievements[i].description}`));
    }
  }

  console.log(chalk.green('아무키나 누르면 뒤로 갑니다.'));
  const choice = readlineSync.question();
}
