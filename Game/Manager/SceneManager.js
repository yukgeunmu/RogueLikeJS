import chalk from 'chalk';
import figlet from 'figlet';
import readlineSync from 'readline-sync';
import { achievements } from '../Achivement/AchivementList.js';
import { rewardType } from '../Enum/Enums.js';
import { BattleManager } from './BattleManager.js';

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
  static displayStatus(stage, player, monsters) {
    console.log(chalk.magentaBright(`\n=== Current Status ===`));
    console.log(
      chalk.cyanBright(`| Stage: ${stage} `) +
        chalk.blueBright(
          `| 플레이어 정보 HP: ${player.hp}, DMG: ${player.damage} DFS: ${player.defence} `
        )
    );
    console.log(chalk.magentaBright(`=====================\n`));

    for (let i = 0; i < monsters.length; i++) {
      const name = `<${monsters[i].name}>`.padEnd(10);
      const hp = `HP: ${monsters[i].hp}`.padEnd(10);
      const dmg = `DMG: ${monsters[i].damage}`.padEnd(10);
      const def = `DFS: ${monsters[i].defence}`.padEnd(10);

      console.log(chalk.redBright(`${name} | ${hp} ${dmg} ${def} |`));
    }
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
    console.log(chalk.blue('3.') + chalk.white(' 삭제하기'));
    console.log(chalk.blue('4.') + chalk.white(' 나가기'));
  }

  // 승리 후 보상 창
  static displayReward(stage) {
    console.clear();

    console.log(chalk.green('보상을 선택해주세요.'));
    console.log();

    // 옵션들
    let randomhp = parseInt(Math.random() * 50) + stage;
    let randomDamage = parseInt(Math.random() * 9) + stage;
    let randomDefence = parseInt(Math.random() * 9) + stage;
    let randomAgility = parseInt(Math.random() * 9) + stage;

    let total = {
      hp: randomhp,
      damage: randomDamage,
      defence: randomDefence,
      agility: randomAgility,
    };

    console.log(
      chalk.blue('1.') + chalk.white(`${rewardType.health} +${randomhp}`)
    );
    console.log(
      chalk.blue('2.') + chalk.white(`${rewardType.damage} +${randomDamage}`)
    );
    console.log(
      chalk.blue('3.') + chalk.white(`${rewardType.defenece} +${randomDefence}`)
    );
    console.log(
      chalk.blue('4.') + chalk.white(`${rewardType.agility} +${randomAgility}`)
    );

    // 하단 경계선
    const line = chalk.magentaBright('='.repeat(50));
    console.log(line);

    // 하단 설명
    console.log(chalk.gray('1-4 사이의 수를 입력한 뒤 엔터를 누르세요.'));

    return total;
  }

  // 공격할 몬스터 선택
  static displaySelectMonster(player, monsters) {
    console.clear();
    console.log(chalk.magentaBright(`\n=== Current Status ===`));
    console.log(
      chalk.blueBright(
        `| 플레이어 정보 HP: ${player.hp}, DMG: ${player.damage} DFS: ${player.defence} `
      )
    );
    console.log(chalk.magentaBright(`=====================\n`));

    console.log(chalk.green('몬스터를 선택해주세요.'));
    console.log();

    for (let i = 0; i < monsters.length; i++) {
      const name = `<${monsters[i].name}>`.padEnd(10);
      const hp = `HP: ${monsters[i].hp}`.padEnd(10);
      const dmg = `DMG: ${monsters[i].damage}`.padEnd(10);
      const def = `DFS: ${monsters[i].defence}`.padEnd(10);

      console.log(
        chalk.redBright(`[${i + 1}] ${name} | ${hp} ${dmg} ${def} |`)
      );
    }

    // 하단 경계선
    const line = chalk.magentaBright('='.repeat(50));
    console.log(line);

    // 하단 설명
    console.log(
      chalk.gray(`1-${monsters.length} 사이의 수를 입력한 뒤 엔터를 누르세요.`)
    );
  }

  // 사용할 스킬 선택
  static displaySkillList(skills) {
    console.clear();

    const line = chalk.magentaBright('='.repeat(50));

    console.log(chalk.green('스킬을 선택해주세요.'));
    console.log();
    console.log(line);
    // 옵션들
    for (let i = 0; i < skills.length; i++) {

      const skillname = `${skills[i].name}: `;
      const skilldescription = `${skills[i].description}`;

      console.log(
        chalk.blue(`${i + 1}. `) +
          chalk.greenBright(`${skillname}`) +
          chalk.white(`${skilldescription}`) +
          chalk.blueBright(` (남은 횟수: ${skills[i].maxUses})`)
      );
    }
    console.log(line);

    // 하단 경계선

    // 하단 설명
    console.log(chalk.gray('1-4 사이의 수를 입력한 뒤 엔터를 누르세요.'));

  }

  // 플레이어 배틀 결과 창
  static displayBattleResultPlayer(player, monster) {}

  // 몬스터 배틀 결과 창
  static displayBattleResultMonster(player, monster) {}
}
