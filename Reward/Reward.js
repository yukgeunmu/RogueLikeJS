export function LevelUp(player, stage) {

  player.maxHp = player.maxHp + (stage - 1) + 10;
  player.damage = player.damage + (stage - 1) + 10;
  player.defence = player.defence + (stage - 1) + 1;
  player.Agility = player.Agility + (stage - 1) + 1;

  player.hp = player.maxHp;
  return player;
}
