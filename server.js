import { SceneManager } from './Manager/SceneManager.js';

// 게임 시작 함수
export function start() {
  SceneManager.displayLobby();
  SceneManager.handleUserInput();
}

// 게임 실행
start();
