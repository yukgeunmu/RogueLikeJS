import { Skill } from '../Data/Skill.js';

export class AgilityBuffSkill extends Skill {
  execute(caster, target) {
    target.agility += this.skillValue;
  }
}
