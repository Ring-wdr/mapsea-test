import { jest } from '@jest/globals';
import request from 'supertest';
import { server } from '..';

afterEach(() => {
  server.close();
});

describe('total ROUTER TEST', () => {
  test('total - GET', async () => {
    const expectedData = {
      singer: '윤하', //가수명
      song: '사건의 지평선', //곡명
      releaseDate: '2022.3.30', //발매일
    };
    const response = await request(server).get('/total');
    expect(response.body).toContainEqual(expectedData);
  });
});

describe('singer test', () => {
  test('singer - 가수 이름 없을 때', async () => {
    const response = await request(server).get('/singer');
    expect(response.body).toEqual({
      message: 'GET 요청시 singer/ 뒤에 가수를 입력해주세요',
    });
  });
  test('singer 윤하 - GET', async () => {
    const expectedData = {
      singer: '윤하', //가수명
      song: '사건의 지평선', //곡명
      releaseDate: '2022.3.30', //발매일
    };
    const response = await request(server).get(encodeURI('/singer/윤하'));
    expect(response.body).toContainEqual(expectedData);
  });
  test('singer 르세라핌 - GET', async () => {
    const expectedData = {
      singer: 'LE SSERAFIM (르세라핌)',
      song: 'ANTIFRAGILE',
      releaseDate: '2022.10.17',
    };
    const response = await request(server).get(encodeURI('/singer/르세라핌'));
    expect(response.body).toContainEqual(expectedData);
  });
});
