import { db_all } from '../database/getSinger.js';

export const getBySinger = async (req, res) => {
  const { singerName } = req.params;
  res.send(
    await db_all('SELECT * FROM Artist WHERE singer LIKE ?', [
      `%${singerName}%`,
    ])
  );
};
