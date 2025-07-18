import { SkillStrategy } from './SkillStrategy.js';
import chalk from 'chalk';


// 드래곤 스킬
export class FireBreathSkill extends SkillStrategy {
  execute(caster, target, skillData, stage) {
    const damage = skillData.calculateValue(stage);
    skillData.appliedValue = damage; // 지속 데미지를 위해 저장
    target.hp -= damage * 2;

    if (!target.deBuffs.includes(skillData)) {
      target.deBuffs.push(skillData);
    } else {
      skillData.duration = skillData.InitDuration;
    }

    return chalk.red(
      `${caster.name}이(가) 화염 숨결을 내뿜어 ${target.name}에게 ${damage * 2}의 화염 데미지를 입혔습니다.`
    );
  }

  // 지속 데미지 로직 (필요하다면 apply 메서드 구현)
  apply(target, skillData) {
    target.hp -= skillData.appliedValue;
    return chalk.red(
      `${target.name}이(가) 화상으로 ${skillData.appliedValue}의 데미지를 입습니다.(남은 턴:${skillData.duration})`
    );
  }

  // remove 로직 (지속 데미지가 끝날 때)
  remove(target, skillData) {
    return chalk.red(`${target.name}의 화상 효과가 사라졌습니다.`);
  }

  getEffectDescription(skillData, stage) {
    const damage = skillData.calculateValue(stage);
    return chalk.redBright(
      `<${skillData.duration}턴 간 ${damage} 데미지 및 화상>`
    );
  }
}
