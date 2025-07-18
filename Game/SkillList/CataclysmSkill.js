import { SkillStrategy } from './SkillStrategy.js';
import chalk from 'chalk';

// 마왕 스킬
export class CataclysmSkill extends SkillStrategy {
  execute(caster, target, skillData, stage) {
    const damage = skillData.calculateValue(stage);
    skillData.appliedValue = damage; // 디버프 지속 데미지를 위해 저장
    target.hp -= damage;

    if (!target.deBuffs.includes(skillData)) {
      target.damage /= 2;
      target.deBuffs.push(skillData);
    } else {
      skillData.duration = skillData.InitDuration;
    }

    return chalk.redBright(
      `${caster.name}이(가) 대격변을 시전하여 ${target.name}에게 ${damage}의 막대한 피해를 입혔습니다!`
    );
  }

  // 지속 데미지/디버프 로직 (필요하다면 apply 메서드 구현)
  apply(target, skillData) {
    // 공격력 감소 디버프 적용 등
    return chalk.redBright(`공격 감소가 ${skillData.duration}턴 남았습니다.`);
  }

  // remove 로직 (디버프가 끝날 때)
  remove(target, skillData) {
    target.damage *= 2;
    return chalk.redBright(`${target.name}의 공격력 감소 효과가 사라졌습니다.`);
  }

  getEffectDescription(skillData, stage) {
    const damage = skillData.calculateValue(stage);
    return chalk.redBright(
      `<${skillData.duration}턴 간 ${damage} 데미지 및 공격력 감소>`
    );
  }
}
