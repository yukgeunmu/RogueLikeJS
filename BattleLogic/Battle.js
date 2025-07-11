import chalk from 'chalk';


export class Battle {
  // 기본공격 로직
  BasicAttack(player, monster, logs) {
    logs.push(monster.takeDamage(player.damage));
    logs.push(player.takeDamage(monster.damage));
    return logs;
  }

  // 연속 공격 로직
  DoubleAttack(player, monster, logs) {
    let randomInit = parseInt(Math.random() * 100) + 1;

    if (randomInit < 25) {
      logs.push(chalk.green('연속 공격에 성공하였습니다.'));
      logs.push(monster.takeDamage(player.damage * 2));
      logs.push(player.takeDamage(monster.damage));
    } else {
      logs.push(chalk.red('연속 공격에 실패하였습니다.'));
      logs.push(monster.takeDamage(player.damage * 0.5));
      logs.push(player.takeDamage(monster.damage));
    }

    return logs;
  }

  // 방어 로직
  DefenceMode(player, monster, logs) {
    let randomInit = parseInt(Math.random() * 100) + 1;

    if (randomInit < 55) {
      logs.push(chalk.green('방어에 성공하였습니다.'));
      logs.push(player.takeDamage(0));
    } else {
      logs.push(chalk.red('방어에 실패하였습니다.'));
      logs.push(player.takeDamage(monster.damage));
    }

    return logs;
  }
}
