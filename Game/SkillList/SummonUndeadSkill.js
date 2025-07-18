import { SkillStrategy } from './SkillStrategy.js';
import chalk from 'chalk';
import { Monster } from '../Data/Monster.js';


// 리키킹 소환 스킬
export class SummonUndeadSkill extends SkillStrategy {
  execute(caster, target, skillData, stage, monsters) {
    // 하수인 소환 로직은 BattleManager나 Stage에서 처리해야 합니다.
    // 여기서는 단순히 소환 메시지만 출력합니다.
    // 예: BattleManager.summonMonster(new Monster('Zombie', ...));
    let Zombie = new Monster(
      'Zombie',
      caster.maxHp / 2,
      caster.maxHp / 2,
      caster.damage / 2,
      caster.defence / 2,
      caster.agility / 2
    );

    if (monsters.length < 4) {
      monsters.push(Zombie);
      return chalk.magentaBright(`${caster.name}이(가) 언데드 하수인을 소환합니다!`);
    } else {
      const value = skillData.calculateValue(stage);
      monsters.pop();
      caster.hp += value;
      return chalk.magentaBright(
        `${caster.name}이(가) 하수인을 흡수해서 체력을 ${value} 회복합니다.`
      );
    }
  }

  getEffectDescription(skillData, stage) {
    return chalk.gray(`<언데드 하수인 소환>`);
  }
}
