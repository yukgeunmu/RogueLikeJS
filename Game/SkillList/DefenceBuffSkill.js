import { Skill } from '../Data/Skill.js';

export class DefenceBuffSkill extends Skill {
  execute(caster, target) {
    target.defence += this.skillValue;
  }
}
