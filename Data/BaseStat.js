export class BaseStat {
  constructor(hp, damage) {
    this._hp = hp;
    this._damage = damage;
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

  set damage(value){
    this._damage = value;
  }
}
