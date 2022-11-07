import SQL from 'sqlite3';
import { MOCK_DB } from '../../config.js';

const sqlite3 = SQL.verbose();

export const db_all = async (query, dependency) => {
  const db = new sqlite3.Database(MOCK_DB, sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err);
    console.log('connection success!');
  });
  return new Promise((res, rej) => {
    db.all(query, dependency, (err, rows) => {
      if (err) return rej(err);
      res(rows);
    });
    db.close((err2) => {
      if (err2) return rej(err2);
    });
  });
};
