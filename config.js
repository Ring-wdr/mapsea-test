import { config } from 'dotenv';
config();

export const HOST_PORT = process.env.HOST_PORT;
export const ORIGIN = process.env.ORIGIN;
export const MOCK_DB = process.env.MOCK_DB;
export const option = {
  params: {
    start: 1,
    display: 100,
  },
};
