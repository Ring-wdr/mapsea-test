import express from 'express';
import { getTotal, postTotal } from '../controller/total.js';

const router = express.Router();

router.get('/', getTotal);

router.post('/', postTotal);

export default router;
