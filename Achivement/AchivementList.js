import fs from 'fs/promises';
import { achievementType } from '../Enum/Enums.js';

const data = await fs.readFile('./Achivement/achivement.json', 'utf-8');
export let achievements = JSON.parse(data);

export const count = {
  [achievementType.kill]: 0,
  [achievementType.reach]: 0,
  [achievementType.revive]: 0,
  [achievementType.death]: 0,
};

export function AchievementCount(type) {
  if (type in count) count[type]++;

  for (const achievement of achievements) {
    if (
      achievement.type === type &&
      achievement.target === count[type] &&
      !achievement.isTrue
    ) {
      achievement.isTrue = true;
    }
  }
}

export function LoadData(data, countData) {
  achievements = data;
  Object.assign(count,countData);
}
