import { promises as fs } from 'fs';
import { achievements, LoadData } from './Achivement/AchivementList.js';
import startServer from './app.js';
import {
  createAchivement,
  getAchivement,
  updateAchivement,
  deleteAchievement,
} from './crud.js';

export async function Save() {
  try {
    const server = await startServer();

    for (let i = 0; i < achievements.length; i++) {
      await updateAchivement(achievements[i]);
    }

    console.log('모든 업적 저장 완료');
    server.close();

    //로컬
    // 1. 배열을 JSON 문자열로 변환
    // const jsonString = JSON.stringify(achievements, null, 2); // 들여쓰기 2칸 (가독성 좋게)
    // 2. 파일에 저장 (덮어쓰기)
    // await fs.writeFile('./Achivement/saveachivement.json', jsonString, 'utf-8');

    // console.log('파일 저장 완료!');
  } catch (error) {
    console.error('에러 발생:', error);
  }
}

export async function Load() {
  console.log('데이터로드중...');
  try {
    const server = await startServer();

    const result = await getAchivement();

    LoadData(result);

    console.log('모든 업적 로드 완료');
    server.close();

    // 로컬
    // const data = await fs.readFile('./Achivement/saveachivement.json', 'utf-8');
    // console.log('데이터 로드 완료');
    // let loadData = JSON.parse(data);
    // LoadData(loadData);
  } catch (error) {
    console.error('에러 발생:', error);
  }
}

export async function DeleteSave(){
  console.log('저장한 데이터 삭제 중...');
  try{
    const server = await startServer();

    for (let i = 0; i < achievements.length; i++) {
      await deleteAchievement(achievements[i]);
    }

    for(let i =0; i < achievements.length; i++)
    {
      await createAchivement(achievements[i]);
    }

    console.log('삭제 완료');
    server.close();

  }catch(error){
     console.error('에러 발생:', error);
  }
}
