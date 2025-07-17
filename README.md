# RogueLikeJS

## 📜 개요

Node.js를 사용하여 만든 텍스트 기반의 로그라이크 RPG 게임입니다. 플레이어는 다양한 스킬을 배우고, 몬스터와 싸우며, 여러 스테이지를 클리어해나가야 합니다. 또한, 달성한 업적은 서버에 저장되어 관리됩니다.

## ✨ 주요 기능

- 턴제 기반의 전투 시스템
- 다양한 종류의 액티브 및 패시브 스킬
- 플레이어 및 몬스터의 스탯 시스템
- 스테이지 진행 방식
- 업적 시스템 및 서버 연동

## 🛠️ 기술 스택

- **Core**: Node.js
- **Backend**: Express.js
- **Database**: MongoDB (Mongoose)
- **CLI**: `readline-sync`, `chalk`, `figlet`
- **Code Style**: Prettier

## 🚀 설치 및 실행

1.  **저장소 복제**
    ```bash
    git clone <your-repository-url>
    cd RogueLikeJS
    ```

2.  **의존성 설치**
    `yarn.lock` 파일이 있으므로 `yarn` 사용을 권장합니다.
    ```bash
    yarn install
    ```
    또는 `npm`을 사용할 경우:
    ```bash
    npm install
    ```

3.  **서버 실행**
    업적 데이터 저장을 위해 MongoDB 서버가 실행 중이어야 합니다.
    ```bash
    node server.js
    ```

4.  **게임 실행**
    새로운 터미널을 열고 다음 명령어를 실행하여 게임을 시작합니다.
    ```bash
    node game.js
    ```

### 스크립트

- **코드 포맷팅**
  프로젝트 전체의 코드 스타일을 정리합니다.
  ```bash
  yarn format
  ```

## 📁 프로젝트 구조

```
RogueLikeJS/
├── Game/                 # 게임의 핵심 로직
│   ├── Achivement/       # 업적 관련 로직
│   ├── Data/             # 플레이어, 몬스터, 스킬 등 데이터 정의
│   ├── Enum/             # 게임에 사용되는 열거형
│   ├── Manager/          # 전투, 입력, 씬 등 관리자 클래스
│   └── SkillList/        # 개별 스킬 구현체
├── Server/               # Express 서버 관련 로직
│   ├── app.js            # Express 앱 설정
│   └── crud.js           # 데이터베이스 CRUD 작업
├── routes/               # API 라우팅
├── schemas/              # MongoDB 스키마 정의
├── game.js               # 게임 시작점 (CLI)
├── server.js             # 서버 시작점
└── package.json          # 프로젝트 정보 및 의존성
```
