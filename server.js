import { SceneManager } from './Manager/SceneManager.js';

// 게임 시작 함수
export async function start() {
  while (true) {
    SceneManager.displayLobby();
    await SceneManager.handleUserInput();
  }
}

// 게임 실행
start();
