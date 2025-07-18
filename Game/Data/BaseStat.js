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

  endTurn(logs) {

    this.buffsSearch(this, this.buffs, logs);
    this.buffsSearch(this, this.deBuffs, logs);

    return logs;

    // if (this.buffs.length !== 0) {
    //   for (let i = this.buffs.length - 1; i >= 0; i--) {
    //     this.buffs[i].duration--;
    //     const buffSkill = this.buffs[i];
    //     if (this.buffs[i].duration > 0)
    //       logs.push(buffSkill.usingSkill.apply(this, buffSkill));
    //     if (this.buffs[i].duration <= 0) {
    //       logs.push(this.buffs[i].usingSkill.remove(this, this.buffs[i]));
    //       this.buffs[i].duration = this.buffs[i].InitDuration;
    //       this.buffs.splice(i, 1);
    //     }
    //   }
    // }

    // if (this.deBuffs.length !== 0) {
    //   for (let i = this.deBuffs.length - 1; i >= 0; i--) {
    //     this.deBuffs[i].duration--;
    //     const debuffSkill = this.deBuffs[i];
    //     if (this.deBuffs[i].duration > 0)
    //       logs.push(debuffSkill.usingSkill.apply(this, debuffSkill));
    //     if (this.deBuffs[i].duration <= 0) {
    //       logs.push(this.deBuffs[i].usingSkill.remove(this, this.deBuffs[i]));
    //       this.deBuffs[i].duration = this.deBuffs[i].InitDuration;
    //       this.deBuffs.splice(i, 1);
    //     }
    //   }
    // }
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
