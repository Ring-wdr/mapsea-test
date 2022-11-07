import axios from 'axios';
import SQL from 'sqlite3';
import { ORIGIN, MOCK_DB, option } from '../../config.js';

const sqlite3 = SQL.verbose();

export const getTotal = async (request, response) => {
  const { data } = await axios.get(ORIGIN, option);
  response.send(
    data.response.result.chart.items.tracks.map((track) => ({
      singer: track.artists[0].artistName,
      song: track.trackTitle,
      releaseDate: track.album.releaseDate,
    }))
  );
};

export const postTotal = async (req, res) => {
  const db = new sqlite3.Database(MOCK_DB, sqlite3.OPEN_READWRITE, (err) => {
    // if (err) return console.error(err)
    if (err) return res.status(500).send(err);
    console.log('db connection success!');
  });

  const {
    data: {
      response: {
        result: {
          chart: {
            items: { tracks },
          },
        },
      },
    },
  } = await axios.get(ORIGIN, option);

  db.serialize(() => {
    db.run('DROP TABLE IF EXISTS Artist', (_, err) => {
      if (err) return res.status(500).send(err);
    });
    db.run('CREATE TABLE Artist(singer, song, releaseDate)', (_, err) => {
      if (err) return res.status(500).send(err);
    });
    const stmt = db.prepare('INSERT INTO Artist VALUES (?, ?, ?)');
    tracks.forEach((track) => {
      stmt.run(
        track.artists[0].artistName,
        track.trackTitle,
        track.album.releaseDate
      );
    });
    stmt.finalize((err) => {
      if (err) return res.status(500).send(err);
    });
  });
  db.close((err) => {
    if (err) res.status(500).send(err);
  });
  res.send('정상 입력되었습니다.');
};
