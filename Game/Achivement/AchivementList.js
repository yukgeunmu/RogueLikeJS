import fs from 'fs/promises';

const data = await fs.readFile('./Game/Achivement/achivement.json', 'utf-8');
export const achievements = JSON.parse(data);

export function AchievementCount(type) {
  for (const achievement of achievements) {

    if(achievement.progress >= achievement.target) continue;

    if (achievement.type === type) {
      achievement.progress++;
      if (achievement.target <= achievement.progress && !achievement.isTrue) {
        achievement.isTrue = true;
      }
    }
  }
}

export function LoadData(data) {
  
  achievements.splice(0,achievements.length, ...data);
}

