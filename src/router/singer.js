import express from 'express';
import { getBySinger } from '../controller/singer.js';

const router = express.Router();

router.get('/:singerName', getBySinger);

router.get('/', (req, res)=>{
    res.send('GET 요청시 singer/ 뒤에 가수를 입력해주세요');
});

export default router;