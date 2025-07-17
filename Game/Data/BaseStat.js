export class BaseStat {
  constructor(name, hp, maxHp, damage, defence, agility) {
    this.name = name;
    this._hp = hp;
    this._maxHp = maxHp;
    this._damage = damage;
    this._defence = defence;
    this._agility = agility;

  }

  get maxHp(){
    return this._maxHp;
  }

  set maxHp(value){
    this._maxHp = value;
  }

  get hp() {
    return this._hp;
  }

  set hp(value) {
    if (value <= 0) this._hp = 0;
    else if(value >= this.maxHp) this._hp = this.maxHp;
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

  get agility() {
    return this._agility;
  }

  set agility(value) {
    if (value >= 80) this._agility = 80;
    else this._agility = value;
  }

  
}
