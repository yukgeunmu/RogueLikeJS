import { Monster } from './Monster.js';
import { Skill } from './Skill.js';
import fs from 'fs/promises';


const bossSkillData = await fs.readFile('./Game/Data/bossSkills.json', 'utf-8');
const bossSkills = JSON.parse(bossSkillData);

// 보스 몬스터 클래스
export class BossMonster extends Monster {
  constructor(name, hp, damage, defence, agility, bossSkillId, isBoss) {
    super(name, hp, damage, defence, agility);
    this.bossSkillId = bossSkillId;
    this.bossSkill = new Skill(
      bossSkills.find((skill) => skill.id === bossSkillId)
    );
    this.isBoss = true;
    this.exp = 50;
  }

  // 보스 스킬 사용
  useBossSkill(target, stage, monsters) {
    if (this.bossSkill) {
      return this.bossSkill.useSkill(this, target, stage, monsters);
    }
    return null;
  }
}
