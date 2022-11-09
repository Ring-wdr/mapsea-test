import { db_all } from '../database/getSinger.js';

export const getBySinger = async (req, res) => {
  const { singerName } = req.params;
  try {
    const result = await db_all('SELECT * FROM Artist WHERE singer LIKE ?', [
      `%${singerName}%`,
    ]);
    if (result.length === 0) {
      res.send('검색 결과가 없습니다!');
    } else {
      res.send(result);
    }
  } catch (err) {
    res.status(500).send('에러가 발생하였습니다.');
  }
};
