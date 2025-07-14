import { SceneManager } from './Game/Manager/SceneManager.js';
import { InputManager } from './Game/Manager/InputManager.js';

export async function start() {
  const loop = async () => {
    SceneManager.displayLobby();
    await InputManager.handleUserInput(); // 입력 기다림
    setImmediate(loop); // 이벤트 루프에 한 틱 양보하고 다시 실행
  };
  loop(); // 루프 시작
}

start();
