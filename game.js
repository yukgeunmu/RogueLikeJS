import chalk from 'chalk';
import readlineSync from 'readline-sync';
import { Player } from './Data/Player.js';
import { Stage } from './Data/Stage.js';
import {
  BasicAttack,
  DefenceMode,
  DoubleAttack,
} from './BattleLogic.js/Battle.js';
import { LevelUp } from './Reward/Reward.js';


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

const battle = async (stage, player, monster) => {
  let logs = [];

  while (player.hp > 0) {
    console.clear();
    displayStatus(stage, player, monster);

    logs.forEach((log) => console.log(log));

    console.log(chalk.green(`\n1. 공격한다 2. 도망친다. 3.연속 공격, 4. 방어`));
    console.log(chalk.green(`당신의 선택은?`));
    const choice = readlineSync.question('');

    // 플레이어의 선택에 따라 다음 행동 처리
    logs.push(chalk.green(`${choice}를 선택하셨습니다.`));

    switch (choice) {
      case '1':
        BasicAttack(player, monster, logs);
        break;
      case '2':
        logs.push(chalk.green('도망쳤습니다.'));
        player.hp -= 10;
        return;
      case '3':
        DoubleAttack(player, monster, logs);
        break;
      case '4':
        DefenceMode(player, monster, logs);
        break;
    }

    if (monster.hp <= 0) break;
  }
};

export async function startGame() {
  console.clear();
  const player = new Player(100, 20, 5, 5);
  const monserSelect = new Stage();
  let stage = 1;

  while (stage <= 10) {
    const monster = monserSelect.monsterSelect(stage);
    await battle(stage, player, monster);

    // 스테이지 클리어 및 게임 종료 조건
    if (player.hp <= 0 && monster.hp > 0) {
      console.log(chalk.red(`플레이어가 사망하였습니다.`));
      console.log(chalk.gray('계속 진행하려면 엔터를 누르세요.'));
      const choice = readlineSync.question('');
      return;
    } else if (player.hp > 0 && monster.hp <= 0) {
      console.log(chalk.green(`플레이어가 승리하였습니다.`));
      console.log(chalk.gray('계속 진행하려면 엔터를 누르세요.'));
      const choice = readlineSync.question('');
      LevelUp(player, stage);
      stage++;
    }
  }

  console.log(chalk.red(`게임을 클리어하였습니다.`));
  console.log(chalk.gray('아무키나 누르면 게임을 종료합니다.'));
  const choice = readlineSync.question('');
}
