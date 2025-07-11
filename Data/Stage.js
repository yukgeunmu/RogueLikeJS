import { Monster } from './Monster.js';

export class Stage {
    
  monsterSelect(number) {
 
    let randomInit = parseInt(Math.random() * 9) + 1;
    let monsterHp = 100 + (number - 1) * randomInit;
    let monsterDamage = 5 +(number - 1) * randomInit;
    let monsterDefence = 1 + (number - 1) * randomInit;
    let monserAgile = (number - 1) * randomInit;

    return new Monster(monsterHp, monsterDamage, monsterDefence, monserAgile);
  }
}
