import { Monster } from './Monster.js';
import { BossMonster } from './BossMonster.js';

export class Stage {
  monsterSelect(stage) {
    const name = ['Orc', 'Goblin', 'Skeleton', 'Orge'];
    const BossName = ['Dragon', 'DarkKnight', 'LichKing', 'DemonLord'];
    let monsters = [];

    let randomCount = parseInt(Math.random() * 4) + 1;

    if (stage % 10 !== 0) {
      for (let i = 0; i < randomCount; i++) {
        let randomName = parseInt(Math.random() * 4);
        let randomInit = parseInt(Math.random() * 10) + stage;
        let monsterHp = 10 * stage + (stage - 1) + randomInit;
        let monsterDamage = 5 + (stage - 1) + randomInit + 2;
        let monsterDefence = 1 + (stage - 1) + randomInit;
        let monserAgile = stage - 1 + randomInit;

        let newMonster = new Monster(
          name[randomName],
          monsterHp,
          monsterDamage,
          monsterDefence,
          monserAgile
        );
        monsters.push(newMonster);
      }
    } else {
      // 보스 몬스터 스탯 배율 (조정 필요)
      const BOSS_HP_MULTIPLIER = 3;
      const BOSS_DAMAGE_MULTIPLIER = 1.5;
      const BOSS_DEFENCE_MULTIPLIER = 2;
      const BOSS_AGILITY_MULTIPLIER = 1.2;

      let randomName = parseInt(Math.random() * 4);
      let randomInit = parseInt(Math.random() * 10) + stage;

      // 일반 몬스터 스탯 계산식을 기반으로 보스 스탯 계산
      let baseMonsterHp = 10 * stage + (stage - 1) + randomInit;
      let baseMonsterDamage = 5 + (stage - 1) + randomInit + 2;
      let baseMonsterDefence = 1 + (stage - 1) + randomInit;
      let baseMonsterAgile = stage - 1 + randomInit;

      let bossHp = Math.floor(baseMonsterHp * BOSS_HP_MULTIPLIER);
      let bossDamage = Math.floor(baseMonsterDamage * BOSS_DAMAGE_MULTIPLIER);
      let bossDefence = Math.floor(baseMonsterDefence * BOSS_DEFENCE_MULTIPLIER);
      let bossAgile = Math.floor(baseMonsterAgile * BOSS_AGILITY_MULTIPLIER);

      let bossSkillId;
      switch (BossName[randomName]) {
        case 'Dragon':
          bossSkillId = 'boss_skill_001'; // Fire Breath
          break;
        case 'DarkKnight':
          bossSkillId = 'boss_skill_002'; // Dark Slash
          break;
        case 'LichKing':
          bossSkillId = 'boss_skill_003'; // Summon Undead
          break;
        case 'DemonLord':
          bossSkillId = 'boss_skill_004'; // Cataclysm
          break;
        default:
          bossSkillId = null; // Or a default boss skill
      }

      let bossMonster = new BossMonster(
        BossName[randomName],
        bossHp,
        bossDamage,
        bossDefence,
        bossAgile,
        bossSkillId // Pass bossSkillId to BossMonster constructor
      );

      monsters.push(bossMonster);
    }

    return monsters;
  }
}
