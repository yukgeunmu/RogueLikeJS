// /schemas/index.js

import mongoose from 'mongoose';

const connect = () => {
  mongoose
    .connect(
      'mongodb+srv://ygm:sdsd0615@cluster0.kyecccq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
      {
        dbName: 'RogukikeGame', // spa_mall 데이터베이스명을 사용합니다.
      },
    )
    .catch((err) => console.log(err))
    .then(() => console.log('몽고디비 연결 성공'));
};

mongoose.connection.on('error', (err) => {
  console.error('몽고디비 연결 에러', err);
});

export default connect;