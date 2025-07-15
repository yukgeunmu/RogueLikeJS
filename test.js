import { Player } from "./Game/Data/Player.js";

const player = new Player(100,100,10,5,5);

player.maxHp += 5;

console.log(player.maxHp);