import chalk from 'chalk';
import figlet from 'figlet';
import readlineSync from 'readline-sync';
import { achievements } from '../Achivement/AchivementList.js';

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

  // 배틀 정보창
  static displayStatus(stage, player, monster) {
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
  static displayAchievement() {
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
        console.log(
          chalk.green(`${achievements[i].name}: ${achievements[i].description}`)
        );
      } else {
        console.log(
          chalk.gray(`${achievements[i].name}: ${achievements[i].description}`)
        );
      }
    }

    console.log(chalk.green('아무키나 누르면 뒤로 갑니다.'));
    const choice = readlineSync.question();
  }

  //옵션 씬
  static displayOption() {
    console.clear();
    console.log(
      chalk.cyan(
        figlet.textSync('Option', {
          font: 'Standard',
          horizontalLayout: 'default',
          verticalLayout: 'default',
        })
      )
    );

    // 상단 경계선
    const line = chalk.magentaBright('='.repeat(50));
    console.log(line);

    console.log(chalk.green('옵션을 선택해주세요.'));
    console.log();

    // 옵션들
    console.log(chalk.blue('1.') + chalk.white(' 저장하기'));
    console.log(chalk.blue('2.') + chalk.white(' 불러오기'));
    console.log(chalk.blue('3.') + chalk.white('삭제하기'));
    console.log(chalk.blue('4.') + chalk.white(' 나가기'));
  }
}
