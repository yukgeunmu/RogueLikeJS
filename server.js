import { SceneManager } from './Manager/SceneManager.js';




export async function start() {
  const loop = async () => {
    SceneManager.displayLobby();
    await SceneManager.handleUserInput(); // 입력 기다림
    setImmediate(loop); // 이벤트 루프에 한 틱 양보하고 다시 실행
  };
  loop(); // 루프 시작
}

start();
