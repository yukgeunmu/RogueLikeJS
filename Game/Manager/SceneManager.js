import chalk from 'chalk';
import figlet from 'figlet';
import readlineSync from 'readline-sync';
import { achievements } from '../Achivement/AchivementList.js';
import { rewardType } from '../Enum/Enums.js';

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
          `| 플레이어 정보 HP: ${player.hp}, DMG: ${player.damage} DFS: ${player.defence} AGI: ${player.agility} |`
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
  static displayReward(player, stage) {
    console.clear();
    console.log(chalk.magentaBright(`\n=== Current Status ===`));
    SceneManager.displayPlayerStatus(player);
    console.log(chalk.magentaBright(`=====================\n`));

    console.log(chalk.green('보상을 선택해주세요.'));
    console.log();

    // 옵션들
    let randomhp = parseInt(Math.random() * 50) + stage;
    let randomDamage = parseInt(Math.random() * 10) + stage;
    let randomDefence = parseInt(Math.random() * 10) + stage;
    let randomAgility = parseInt(Math.random() * 10) + stage;

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
    SceneManager.displayPlayerStatus(player);
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
    console.log(chalk.gray('0을 입력하면 뒤로 나갑니다.'));
  }

  // 사용할 스킬 선택
  static displaySkillList(skills, stage) {
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
          skills[i].getEffectDescription(stage) +
          chalk.blueBright(` (남은 횟수: ${skills[i].maxUses})`)
      );
    }
    console.log(line);

    // 하단 경계선

    // 하단 설명
    console.log(chalk.gray('1-4 사이의 수를 입력한 뒤 엔터를 누르세요.'));
    console.log(chalk.gray('0을 입력하면 뒤로 나갑니다.'));
  }

  // 플레이어 상태창
  static displayPlayerStatus(player) {
    console.log(
      chalk.blueBright(
        `| 플레이어 정보 HP: ${player.hp}, DMG: ${player.damage} DFS: ${player.defence} AGI: ${player.agility} |`
      )
    );
  }

  // 플레이어 승리 결과 창
  static displayBattleResultPlayer(player, stage, dieMonsters) {
    console.clear();

    console.log(
      chalk.greenBright(
        figlet.textSync('YOU WIN', {
          font: 'Standard',
          horizontalLayout: 'default',
          verticalLayout: 'default',
        })
      )
    );

    console.log(chalk.green('승리하였습니다.'));
    console.log(
      chalk.blueBright(`클리어 스테이지: `) + chalk.green(`Stage ${stage}`)
    );
    let nexStage = stage + 1;
    console.log(
      chalk.blueBright(`다음 스테이지: `) +
        chalk.yellowBright(`Stage ${nexStage}`)
    );
    console.log(`남은 스테이지: ${99 - stage}`);
    console.log(chalk.greenBright(`남은 체력: ${player.hp}`));

    this.ResultKillWindow(dieMonsters);
  }

  // 패배 창
  static displayDefeat(stage, dieMonsters) {
    console.clear();

    console.log(
      chalk.redBright(
        figlet.textSync('YOU DIE', {
          font: 'Standard',
          horizontalLayout: 'default',
          verticalLayout: 'default',
        })
      )
    );

    console.log(chalk.redBright('사망하였습니다.'));
    console.log(
      chalk.red(`도달한 스테이지: `) + chalk.redBright(`Stage ${stage}`)
    );
    console.log(`남은 스테이지: ${100 - stage}`);

    this.ResultKillWindow(dieMonsters);
  }

  static ResultKillWindow = (dieMonsters) => {
    console.log(chalk.magentaBright(`======== 처치한 몬스터 ========`));
    console.log(
      chalk.blue('고블린: ') + chalk.yellowBright(dieMonsters['Goblin'])
    );
    console.log(
      chalk.blue('스켈레톤: ') + chalk.yellowBright(dieMonsters['Skeleton'])
    );
    console.log(chalk.blue('오크: ') + chalk.yellowBright(dieMonsters['Orc']));
    console.log(
      chalk.blue('오우거: ') + chalk.yellowBright(dieMonsters['Orge'])
    );
    console.log(chalk.magentaBright(`======== 보스 몬스터 =========`));
    console.log(
      chalk.blue('드래곤: ') + chalk.yellowBright(dieMonsters['Dragon'])
    );
    console.log(
      chalk.blue('다크나이트: ') + chalk.yellowBright(dieMonsters['DarkKnight'])
    );
    console.log(
      chalk.blue('리치킹: ') + chalk.yellowBright(dieMonsters['LichKing'])
    );
    console.log(
      chalk.blue('마왕: ') + chalk.yellowBright(dieMonsters['DemonLord'])
    );
    console.log(chalk.magentaBright(`=============================`));
  };
}
