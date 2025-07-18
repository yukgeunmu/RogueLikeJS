
// 스킬들이 반드시 구현해야하는 인터페이스
export class SkillStrategy{
    execute(caster, target, skillData){
        throw new Error("SkillStrategy를 상속받은 클래스는 'execute' 메서드를 반드시 구현해야 합니다.")
    }
    getEffectDescription(skillData, stage){
         throw new Error("SkillStrategy를 상속받은 클래스는 'getEffectDescription' 메서드를 반드시 구현해야 합니다.")
    }
}