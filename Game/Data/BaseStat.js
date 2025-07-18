export class BaseStat {
  constructor(name, hp, damage, defence, agility) {
    this.name = name;
    this._hp = hp;
    this._maxHp = hp;
    this._damage = damage;
    this._defence = defence;
    this._agility = agility;
    this.buffs = [];
    this.deBuffs = [];

  }

  get maxHp() {
    return this._maxHp;
  }

  set maxHp(value) {
    this._maxHp = value;
  }

  get hp() {
    return this._hp;
  }

  set hp(value) {
    if (value <= 0) this._hp = 0;
    else if (value >= this.maxHp) this._hp = this.maxHp;
    else this._hp = value;
  }

  get damage() {
    return this._damage;
  }

  set damage(value) {
    this._damage = value;
  }

  get defence() {
    return this._defence;
  }

  set defence(value) {
    if (value >= 50) this._defence = 50;
    else this._defence = value;
  }

  get agility() {
    return this._agility;
  }

  set agility(value) {
    if (value >= 50) this._agility = 50;
    else this._agility = value;
  }

  startTurn() {}

  //전투 끝난 후 플레이어와 몬스터 버프/디버프 턴 수 확인
  endTurn(logs) {

    this.buffsSearch(this, this.buffs, logs);
    this.buffsSearch(this, this.deBuffs, logs);

    return logs;
  }

  buffsSearch = (target, targetBuffs, logs) => {
    if (targetBuffs.length !== 0) {
      for (let i = targetBuffs.length - 1; i >= 0; i--) {
        targetBuffs[i].duration--;
        const buffSkill = targetBuffs[i];
        if (targetBuffs[i].duration > 0)
          logs.push(buffSkill.usingSkill.apply(target, buffSkill));
        if (targetBuffs[i].duration <= 0) {
          logs.push(targetBuffs[i].usingSkill.remove(target, targetBuffs[i]));
          targetBuffs[i].duration = targetBuffs[i].InitDuration;
          targetBuffs.splice(i, 1);
        }
      }
    }
  };
}
