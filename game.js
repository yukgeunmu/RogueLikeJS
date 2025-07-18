import chalk from 'chalk';
import readlineSync from 'readline-sync';
import { Player } from './Game/Data/Player.js';
import { Stage } from './Game/Data/Stage.js';
import { InputManager } from './Game/Manager/InputManager.js';
import { AchievementCount } from './Game/Achivement/AchivementList.js';
import { achievementType } from './Game/Enum/Enums.js';
import { SceneManager } from './Game/Manager/SceneManager.js';
import { SkillManager } from './Game/Manager/SkillManager.js';

export async function startGame() {
  console.clear();
  const player = new Player('플레이어', 100, 20, 5, 5);
  const selectedSkills = SkillManager.skillSelect();
  const monserSelect = new Stage();
  let dieMonsters = {
    Orc: 0,
    Goblin: 0,
    Skeleton: 0,
    Orge: 0,
    Dragon: 0,
    DarkKnight: 0,
    LichKing: 0,
    DemonLord: 0
  };
  let stage = 1;

  while (stage <= 100) {
    const monsters = monserSelect.monsterSelect(stage);
    await InputManager.battleUserInput(
      stage,
      player,
      monsters,
      selectedSkills,
      dieMonsters
    );

    // 스테이지 클리어 및 게임 종료 조건
    console.clear();
    if (player.hp <= 0 && monsters.length > 0) {
      AchievementCount(achievementType.death);
      SceneManager.displayDefeat(stage, dieMonsters);
      console.log(chalk.gray('계속 진행하려면 엔터를 누르세요.'));
      readlineSync.question('');
      AchievementCount(achievementType.revive);
      return;
    } else if (player.hp > 0 && monsters.length <= 0) {
      AchievementCount(achievementType.reach);
      SceneManager.displayBattleResultPlayer(player, stage, dieMonsters);
      console.log(chalk.gray('계속 진행하려면 엔터를 누르세요.'));
      readlineSync.question('');
      // player.LevelUp(stage);
      let totalStat = SceneManager.displayReward(player, stage);
      await InputManager.rewardUserInput(player, totalStat);
      player.InitData();
      for (let skill of selectedSkills) {
        skill.Init();
      }
      console.log(chalk.gray('계속 진행하려면 엔터를 누르세요.'));
      readlineSync.question('');
      stage++;
    }
  }

  console.log(chalk.red(`게임을 클리어하였습니다.`));
  console.log(chalk.gray('아무키나 누르면 로비로 갑니다.'));
  const choice = readlineSync.question('');
}
