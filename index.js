import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { HOST_PORT } from './config.js';
import totalRouter from './src/router/total.js';
import singerRouter from './src/router/singer.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

app.use('/total', totalRouter);
app.use('/singer', singerRouter);

app.get('/', (req, res) => {
  res.send('2번 과제 제출 서버입니다.');
});

app.listen(HOST_PORT, () => {
  console.log(`listening on port ${HOST_PORT}`);
});
