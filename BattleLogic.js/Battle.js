import chalk from 'chalk';
import { Player } from '../Data/Player.js';
import { Monster } from '../Data/Monster.js';

// 기본공격 로직
export function BasicAttack(player, monster, logs) {
  logs.push(monster.takeDamage(player.damage));
  logs.push(player.takeDamage(monster.damage));
  return logs;
}

// 연속 공격 로직
export function DoubleAttack(player, monster, logs){

  let randomInit = parseInt(Math.random() * 100) + 1;

  if(randomInit < 25)
  {
    logs.push('연속 공격에 성공하였습니다.');
    logs.push(monster.takeDamage(player.damage*2));
    logs.push(player.takeDamage(monster.damage));
  }
  else
  {
    logs.push('연속 공격에 실패하였습니다.');
    logs.push(monster.takeDamage(player.damage*0.5));
    logs.push(player.takeDamage(monster.damage));
  }

  return logs;
}


// 방어 로직
export function DefenceMode(player, monster, logs){

  let randomInit = parseInt(Math.random() * 100) + 1;

  if(randomInit < 55)
  {
    logs.push('방어에 성공하였습니다.');
    logs.push(player.takeDamage(0));
  }
  else
  {
    logs.push('방어에 실패하였습니다.');
    logs.push(player.takeDamage(monster.damage));
  }

  return logs;
}

