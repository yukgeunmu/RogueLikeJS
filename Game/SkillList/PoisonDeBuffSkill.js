import { SkillStrategy } from './SkillStrategy.js';
import chalk from 'chalk';
import readlineSync from 'readline-sync';


// 플레이어 독 단검 스킬
export class PoisonDeBuffSkill extends SkillStrategy {
  execute(caster, target, skillData, stage) {
    const value = skillData.calculateValue(stage);
    skillData.appliedValue = value;

    if (!target.deBuffs.includes(skillData)) {
      target.deBuffs.push(skillData);
    } else {
      skillData.duration = skillData.InitDuration;
    }
    chalk.hex(`#8a2b32`);
    return chalk.hex('#8A2BE2')(
      `독에 감염되어 ${target.name}(이)가 ${value}의 독 데미지를 입습니다.`
    );
  }

  apply(target, skillData) {
    target.hp -= skillData.appliedValue;
    return chalk.hex('#8A2BE2')(
      `${target.name}(이)가 ${skillData.appliedValue}의 독 데미지를 입습니다.(남은 턴: ${skillData.duration})`
    );
  }

  remove(target, skillData) {
    return chalk.yellowBright(`${target.name}의 독 효과가 사라졌습니다.`);
  }

  getEffectDescription(skillData, stage) {
    const value = skillData.calculateValue(stage);

    const script = chalk.greenBright(
      `<${skillData.duration}턴 간 ${value} 데미지>`
    );

    return script;
  }
}
