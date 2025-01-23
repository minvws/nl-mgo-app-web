import { setupServer } from 'msw/node';

export const MOCK_SERVER_URL = 'https://mock.server';

export const server = setupServer();
