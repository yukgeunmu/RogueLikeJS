import chalk from 'chalk';
import { Skill } from '../Data/Skill.js';

export class HealSkill extends Skill {

  execute(caster, target){
      caster.hp += this.skillValue;
      return chalk.greenBright(`${this.skillValue}만큼 체력을 회복 했습니다.`);
  }
}
