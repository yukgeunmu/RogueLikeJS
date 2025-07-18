import axios from 'axios';

//콘솔 창에서 업적데이터 몽고 DB와 읽기,쓰기,삭제 시켜주는 메서드 모아둔 js

// 업적데이터 서버에 생성
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