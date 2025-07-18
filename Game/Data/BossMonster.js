import { Monster } from './Monster.js';
import { Skill } from './Skill.js';
import fs from 'fs/promises';


const bossSkillData = await fs.readFile('./Game/Data/bossSkills.json', 'utf-8');
const bossSkills = JSON.parse(bossSkillData);

export class BossMonster extends Monster {
  constructor(name, hp, damage, defence, agility, bossSkillId, isBoss) {
    super(name, hp, damage, defence, agility);
    this.bossSkillId = bossSkillId;
    this.bossSkill = new Skill(
      bossSkills.find((skill) => skill.id === bossSkillId)
    );
    this.isBoss = true;
  }

  useBossSkill(target, stage, monsters) {
    if (this.bossSkill) {
      return this.bossSkill.useSkill(this, target, stage, monsters);
    }
    return null;
  }
}
