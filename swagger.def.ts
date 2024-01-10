import { swUserRouter } from './src/documentation';

export const swDocument = {
  openapi: '3.0.0',
  info: {
    title: 'wizzerapp.com',
    version: '1.0.0',
    description: 'The wizzerapp interview'
  },
  servers: [
    {
      url: 'http://localhost:4000',
      description: 'Development server'
    }
  ],
  paths: {
    ...swUserRouter,
  }
};
