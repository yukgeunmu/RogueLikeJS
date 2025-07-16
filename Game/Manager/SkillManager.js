import fs from 'fs/promises';
import { Skill } from '../Data/Skill.js';
import { AttackSkill } from '../SkillList/AttackSkill.js';
import { AgilityBuffSkill } from '../SkillList/AgilityBuffSkill.js';
import { DefenceBuffSkill } from '../SkillList/DefenceBuffSkill.js';
const skillData = await fs.readFile('./Game/Data/skills.json', 'utf-8');
export const skills = JSON.parse(skillData);

export class SkillManager {
  static skillSelect() {
    const picked = [];
    const usedIndexes = new Set();

    
    
    while (picked.length < 4 && usedIndexes.size < skills.length) {
      const idx = Math.floor(Math.random() * skills.length);

      if (!usedIndexes.has(idx)) {
        usedIndexes.add(idx);

        let newSkill = new Skill(
          skills[idx].id,
          skills[idx].name,
          skills[idx].type,
          skills[idx].skillValue,
          skills[idx].duration,
          skills[idx].maxUses,
          skills[idx].description
        );
        picked.push(newSkill);
      }
    }

    return picked;
  }
}
