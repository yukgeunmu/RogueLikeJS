import express from 'express';
import achivementRouter from './routes/achivementRoute.js';
import connect from './schemas/index.js';

const startServer = () => {
  const app = express();
  const PORT = 3000;

  connect();

  app.use(express.json()); // json 형태로 서버에 body 데이터를 전달함, req.body에 데이터를 변환하여 넣어준다
  app.use(express.urlencoded({ extended: true })); // form cotent type에서 body 데이터를 전달하면, req.body에 데이터를 변환하여 넣어준다.


  app.use(express.static('./Achivement'));


  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  //라우터 등록
  app.use('/api', [achivementRouter]);

  //서버 시작
  app.listen(PORT, () => {
    console.log(PORT, '포트로 서버가 열렸어요!');
  });
};

startServer();

export default startServer;
