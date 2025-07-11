import chalk from 'chalk';
import readlineSync from 'readline-sync';
import { Player } from './Data/Player.js';
import { Stage } from './Data/Stage.js';
import { LevelUp } from './Reward/Reward.js';
import { SceneManager} from './Manager/SceneManager.js';
import { AchievementCount } from './Achievement/AchievementList.js';
import { achievementType } from './Enum/Enums.js';

export async function startGame() {
  console.clear();
  const player = new Player(100, 20, 5, 5);
  const monserSelect = new Stage();
  let stage = 1;

  while (stage <= 10) {
    const monster = monserSelect.monsterSelect(stage);
    await SceneManager.battle(stage, player, monster);

    // 스테이지 클리어 및 게임 종료 조건
    if (player.hp <= 0 && monster.hp > 0) {
      AchievementCount(achievementType.death);
      console.log(chalk.red(`플레이어가 사망하였습니다.`));
      console.log(chalk.gray('계속 진행하려면 엔터를 누르세요.'));
      readlineSync.question('');
      AchievementCount(achievementType.revive);
      return;
    } else if (player.hp > 0 && monster.hp <= 0) {
      AchievementCount(achievementType.reach);
      console.log(chalk.green(`플레이어가 승리하였습니다.`));
      console.log(chalk.gray('계속 진행하려면 엔터를 누르세요.'));
      LevelUp(player, stage);
      readlineSync.question('');
      stage++;
    }
  }

  console.log(chalk.red(`게임을 클리어하였습니다.`));
  console.log(chalk.gray('아무키나 누르면 로비로 갑니다.'));
  const choice = readlineSync.question('');

}
