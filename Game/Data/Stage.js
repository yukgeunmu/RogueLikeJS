import { Monster } from './Monster.js';

export class Stage {
    
  monsterSelect(stage) {
 
    let randomInit = parseInt(Math.random() * 9) + stage;
    let monsterHp = 100*stage + (stage - 1) + randomInit;
    let monsterDamage = 5 +(stage - 1) + randomInit + 2;
    let monsterDefence = 1 + (stage - 1) + randomInit;
    let monserAgile = (stage - 1) + randomInit;

    return new Monster(monsterHp, monsterDamage, monsterDefence, monserAgile);
  }
}
