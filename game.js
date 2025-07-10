import chalk from 'chalk';
import readlineSync from 'readline-sync';

class Player {
  constructor(hp, damage) {
    this._hp = hp;
    this._damage = damage;
  }

  get hp() {
    return this._hp;
  }

  set hp(value) {
    if (value <= 0) this._hp = 0;
    else this._hp = value;
  }

  get damage() {
    return this._damage;
  }

  attacked(value) {
    let randomInit = parseInt(Math.random() * 100) + 1;

    if (randomInit <= 70) {
      return chalk.green(`플레이어가 회피하였습니다.(남은체력: ${this._hp})`);
    } else {
      this._hp = this._hp - value;
      return chalk.red(
        `플레이어가 ${value}의 데미지를 받았습니다.(남은체력: ${this._hp})`
      );
    }
  }
}

class Monster {
  constructor(stage, hp, damage) {
    this._hp = hp * stage;
    this._damage = damage * stage;
  }

  get hp() {
    return this._hp;
  }

  set hp(value) {
    if (value <= 0) this._hp = 0;
    else this._hp = value;
  }

  get damage() {
    return this._damage;
  }

  attacked(value) {
    this._hp = this._hp - value;
    return chalk.magenta(
      `몬스터가 ${value}의 데미지를 받았습니다.(남은체력: ${this._hp})`
    );
  }
}

function displayStatus(stage, player, monster) {
  console.log(chalk.magentaBright(`\n=== Current Status ===`));
  console.log(
    chalk.cyanBright(`| Stage: ${stage} `) +
      chalk.blueBright(
        `| 플레이어 정보 체력: ${player.hp}, 공격력: ${player.damage} `
      ) +
      chalk.redBright(
        `| 몬스터 정보 체력: ${monster.hp}, 공격력: ${monster.damage} |`
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

    console.log(chalk.green(`\n1. 공격한다 2. 아무것도 하지않는다.`));
    console.log(chalk.green(`당신의 선택은?`));
    const choice = readlineSync.question('');

    // 플레이어의 선택에 따라 다음 행동 처리
    logs.push(chalk.green(`${choice}를 선택하셨습니다.`));

    switch (choice) {
      case '1':
        logs.push(monster.attacked(player.damage));
        break;
      case '2':
        break;
    }

    logs.push(player.attacked(monster.damage));

    if (monster.hp <= 0) break;
  }
};

export async function startGame() {
  console.clear();
  const player = new Player(100, 100);
  let stage = 1;

  while (stage <= 10) {
    const monster = new Monster(stage, 100, 2.5);
    await battle(stage, player, monster);

    // 스테이지 클리어 및 게임 종료 조건
    if(player.hp <= 0) break;
    else player.hp = 100;

    stage++;
  }

 
}
