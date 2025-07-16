import { Player } from './Game/Data/Player.js';

class Animal {
  constructor(name, type) {
    this.name = name;
    this.type = type;
  }

  Sound(a,b) {
    throw new Error('execute() must be implemented');
  }
}

class Dog extends Animal {
  Sound(a)
  {
      console.log(`${a}에게 왈왈`);
  }
}

const dog1 = new Dog('돌돌이', '불독');

 dog1.Sound('주인');
