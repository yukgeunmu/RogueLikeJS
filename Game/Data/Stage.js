import { Monster } from './Monster.js';

export class Stage {
  monsterSelect(stage) {
    const name = ['Orc', 'Goblin', 'Skeleton', 'Orge'];
    let monsters = [];

    let randomCount = parseInt(Math.random() * 4) + 1;

    for (let i = 0; i < randomCount; i++) {
      let randomName = parseInt(Math.random() * 4);
      let randomInit = parseInt(Math.random() * 10) + stage;
      let monsterHp = 10 * stage + (stage - 1) + randomInit;
      let monsterDamage = 5 + (stage - 1) + randomInit + 2;
      let monsterDefence = 1 + (stage - 1) + randomInit;
      let monserAgile = stage - 1 + randomInit;

      let newMonster = new Monster(
        name[randomName],
        monsterHp,
        monsterDamage,
        monsterDefence,
        monserAgile
      );
      monsters.push(newMonster);
    }

    return monsters;
  }
}
