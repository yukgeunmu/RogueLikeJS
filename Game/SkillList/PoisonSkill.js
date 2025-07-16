import chalk from "chalk";
import { Skill } from "../Data/Skill.js";

export class PoisonSKill extends Skill{

    execute(player, monster){
      monster.hp -= this.skillValue;
    }

}