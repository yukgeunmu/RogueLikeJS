import chalk from 'chalk';
import readlineSync from 'readline-sync';
import { SceneManager } from './SceneManager.js';

// 전투 관련 담당하는 배틀매니저
export class BattleManager {
  // 기본공격 로직
  static BasicAttack(player, monsters, stage, logs) {
    SceneManager.displaySelectMonster(player, monsters);

    console.log(chalk.green(`당신의 선택은?`));
    const choice = readlineSync.question('');

    let selectedMonster = monsters[choice - 1];

    if (!selectedMonster) {
      logs.push(chalk.red('올바른 선택을 하세요.'));
      return logs;
    }

    logs.push(selectedMonster.takeDamage(player.damage));

    BattleManager.MonsterAttack(player, monsters, stage, logs);

    return logs;
  }

  // 연속 공격 로직
  static DoubleAttack(player, monsters, stage, logs) {
    let randomInit = parseInt(Math.random() * 100) + 1;

    if (randomInit <= 25) {
      logs.push(chalk.green('연속 공격에 성공하였습니다.'));

      for (let i = 0; i < monsters.length; i++) {
        logs.push(monsters[i].takeDamage(player.damage * 2));
      }
    } else {
      logs.push(chalk.red('연속 공격에 실패하였습니다.'));
      BattleManager.MonsterAttack(player, monsters, stage, logs);
    }
    return logs;
  }

  // 플레이어 스킬 사용 로직
  static SkillUse(player, monsters, skills, logs, stage) {
    logs.length = 0;
    let selectedSkill;

    while (true) {
      SceneManager.displaySkillList(skills, stage);
      logs.forEach((log) => console.log(log));

      console.log(chalk.green(`당신의 선택은?`));
      const choice = readlineSync.question('');

      if (parseInt(choice) >= 1 && parseInt(choice) <= skills.length) {
        selectedSkill = skills[choice - 1];

        if (selectedSkill.maxUses <= 0) {
          logs.length = 0;
          logs.push(
            chalk.red(`${selectedSkill.name}의 사용횟수를 초과하였습니다.`)
          );
        } else break;
      }

      if (parseInt(choice) === 0) {
        return;
      }

      if (!selectedSkill) {
        logs.length = 0;
        logs.push(chalk.red('올바른 선택을 하세요.'));
      }
    }

    if (selectedSkill.type === 'support' || selectedSkill.type === 'buff') {
      logs.push(selectedSkill.useSkill(player, player, stage));

      BattleManager.MonsterAttack(player, monsters, stage, logs);

      return logs;
    }

    //대상 몬스터 선택
    while (true) {
      SceneManager.displaySelectMonster(player, monsters);
      logs.forEach((log) => console.log(log));

      console.log(chalk.green(`당신의 선택은?`));
      const choice2 = readlineSync.question('');

      let selectedMonster = monsters[choice2 - 1];

      if (parseInt(choice2) >= 1 && parseInt(choice2) <= monsters.length) {
        logs.push(selectedSkill.useSkill(player, selectedMonster, stage));

        BattleManager.MonsterAttack(player, monsters, stage, logs);

        return logs;
      }

      if (parseInt(choice2) === 0) {
        return;
      }

      if (!selectedMonster) {
        logs.length = 0;
        logs.push(chalk.red('올바른 선택을 하세요.'));
      }
    }
  }

  // 도망 로직
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

  // 몬스터 공격 로직
  static MonsterAttack(player, monsters, stage, logs) {
    for (let i = 0; i < monsters.length; i++) {
      if (monsters[i].hp <= 0) continue;

      if (!monsters[i].isBoss) {
        logs.push(player.takeDamage(monsters[i]));
      } else {
        let randomInit = parseInt(Math.random() * 100) + 1;

        if (randomInit >= 70) {
          logs.push(monsters[i].useBossSkill(player, stage, monsters));
        } else {
          logs.push(player.takeDamage(monsters[i]));
        }
      }
    }
  }
}
