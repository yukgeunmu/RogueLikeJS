export function LevelUp(player, stage) {
  player.hp = player.hp + (stage - 1) + 10;
  player.damage = player.damage + (stage - 1) + 10;
  player.defence = player.defence + (stage - 1) + 5;
  player.Agility = player.Agility + (stage - 1) + 3;

  return player;
}
