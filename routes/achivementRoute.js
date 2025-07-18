import express from 'express';
import achivementsDB from '../schemas/achivementsDB.js';

const router = express.Router();

// 3. HTTP Method와 URL을 지정한 API를 정의합니다.
// 만약, localhost:3000/api/news 라는 URL로 GET 요청이 들어온다면 해당 코드를 실행합니다.
// router.get('/news', (req, res) => {
//    ...
// });

// 업적 데이터를 서버에 저장
router.post('/achivement', async (req, res, next) => {
  const { id, name, description, type, target, isTrue, progress } = req.body;

  const achivements = await achivementsDB.find({ id }).exec();
  if (achivements.length) {
    return res
      .status(400)
      .json({ success: false, erroMessage: '이미 존재하는 데이터입니다.' });
  }

  const createAchivement = await achivementsDB.create({
    id,
    name,
    description,
    type,
    target,
    isTrue,
    progress,
  });

  return res.status(201).json({ achivements: createAchivement });
});

// 서버에 있는 업적 데이터 읽어오기
router.get('/achivement', async (req, res, next) => {
  const list = await achivementsDB.find().sort('id').exec();

  return res.status(200).json({ list });
});

// 서버에 있는 업적 데이터를 업데이트
router.patch('/achivement/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);

  const { progress } = req.body;

  const currentState = await achivementsDB.findOne({ id }).exec();

  if (!currentState) {
    return res.status(404).json({ erroMessage: '존재하지 않는 업적입니다.' });
  }


  currentState.progress = progress;

  if (currentState.target <= currentState.progress) {
    currentState.isTrue = true;
  }
  else currentState.isTrue = false;

  await currentState.save();

  return res.status(200).json({});
});


// 서버에 있는 업적 데이터 삭제
router.delete('/achivement/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const deleteAchive = await achivementsDB.findOne({ id }).exec();
  if (!deleteAchive) {
    return res.status(404).json({ erroMessage: '존재하지 않는 데이터입니다.' });
  }

  await achivementsDB.deleteOne({ id }).exec();

  return res.status(200).json({});
});

export default router;
