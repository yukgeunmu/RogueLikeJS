import { promises as fs } from 'fs';
import { achievements, LoadData } from './Achivement/AchivementList.js';

export async function Save() {
  try {
    // 1. 배열을 JSON 문자열로 변환
    const jsonString = JSON.stringify(achievements, null, 2); // 들여쓰기 2칸 (가독성 좋게)

    // 2. 파일에 저장 (덮어쓰기)
    await fs.writeFile('./Achivement/saveachivement.json', jsonString, 'utf-8');

    console.log('파일 저장 완료!');
  } catch (error) {
    console.error('에러 발생:', error);
  }
}

export async function Load() {
  console.log('데이터로드중...');
  try {
    const data = await fs.readFile('./Achivement/saveachivement.json', 'utf-8');
    console.log('데이터 로드 완료');
    let loadData = JSON.parse(data);
    LoadData(loadData);
  } catch (error) {
    console.error('에러 발생:', error);
  }
}
