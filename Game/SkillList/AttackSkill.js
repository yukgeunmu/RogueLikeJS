import chalk from "chalk";
import { Skill } from "../Data/Skill.js";

export class AttackSkill extends Skill{

    execute(caster, target){

      target.hp -= this.skillValue;
      return chalk.greenBright(`플레이어가 ${monster.name}에게 ${this.skillValue} 데미지!`);
    }

}