

export class SkillStrategy{
    execute(caster, target, skillData){
        throw new Error("SkillStrategy를 상속받은 클래스는 'execute' 메서드를 반드시 구현해야 합니다.")
    }
}