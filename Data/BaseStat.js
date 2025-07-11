export class BaseStat {
  constructor(hp, damage, defence, Agility) {
    this._hp = hp;
    this._damage = damage;
    this._defence = defence;
    this._Agility = Agility;
  }

  get hp() {
    return this._hp;
  }

  set hp(value) {
    if (value <= 0) this._hp = 0;
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
    if (value >= 80) this._defence = 80;
    else this._defence = value;
  }

  get Agility() {
    return this._Agility;
  }

  set Agility(value) {
    if (value >= 80) this._Agility = 80;
    else this._Agility = math;
  }
}
