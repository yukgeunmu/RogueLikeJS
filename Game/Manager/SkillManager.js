import fs from 'fs/promises';
import { Skill } from '../Data/Skill.js';


const skillData = await fs.readFile('./Game/Data/skills.json', 'utf-8');
export const skills = JSON.parse(skillData);

const bossSkillData = await fs.readFile('./Game/Data/bossSkills.json', 'utf-8');
const bossSkills = JSON.parse(bossSkillData);

// 플레이어 스킬 출력해주는 스킬 매니저
export class SkillManager {
  static skillSelect() {
    const picked = [];
    const usedIndexes = new Set();

    while (picked.length < 4 && usedIndexes.size < skills.length) {
      const idx = Math.floor(Math.random() * skills.length);

      if (!usedIndexes.has(idx)) {
        usedIndexes.add(idx);
        let newSkill = new Skill(skills[idx]);
        picked.push(newSkill);
      }
    }

    return picked;
  }

}
