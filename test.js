class Player {
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

  get damage(){
    return this._damage;
  }

  attacked(value) {
    this._hp = this._hp - value;
  }
}

class Monster {
  constructor(stage, hp, damage) {
    this.hp = hp * stage;
    this.damage = damage * stage;
  }

  get hp() {
    return this._hp;
  }

  set hp(value) {
    if (value <= 0) this._hp = 0;
    else this._hp = value;
  }

  attacked(value) {
    this._hp = this._hp - value;
  }
}

const player1 = new Player(100,5);
const monster1 = new  Monster(1,100,2.5);

monster1.attacked(player1.damage)
console.log(monster1.hp);