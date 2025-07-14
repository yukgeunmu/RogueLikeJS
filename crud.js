import axios from 'axios';
import startServer from './app.js';
import { achievements, LoadData } from './Achivement/AchivementList.js';

export async function createAchivement(achivement) {
  try {
    const res = await axios.post(
      'http://localhost:3000/api/achivement',
      achivement
    );

    console.log(`"${achivement.name}" 업적 저장 완료`);
  } catch (err) {
    console.error('업적 생성 실패:', err.response?.data || err.message);
  }
}

export async function getAchivement() {
  try {
    const res = await axios.get(
      'http://localhost:3000/api/achivement');

    return res.data.list; 
  } catch (err) {
    console.error('업적 불러오기 실패:', err.response?.data || err.message);
  }
}


export async function updateAchivement(achivement) {
  try {
    const res = await axios.patch(
      `http://localhost:3000/api/achivement/${achivement.id}`,
      achivement
    );
  } catch (err) {
    console.error('업적 생성 실패:', err.response?.data || err.message);
  }
}


export async function deleteAchievement(achievement) {
  try {
    const res = await axios.delete(
      `http://localhost:3000/api/achivement/${achievement.id}`
    );
  } catch (err) {
    console.error('업적 삭제 실패:', err.response?.data || err.message);
  }
}

// await startServer();

// for (let i = 0; i < achievements.length; i++) {
//   await createAchievement(achievements[i]);
// }

// for (let i = 0; i < achievements.length; i++) {
//   await deleteAchievement(achievements[i]);
// }
