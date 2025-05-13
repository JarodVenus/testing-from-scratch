import { setupServer } from 'msw/node';
 import { handlers } from './handlers';
 // setupServer pour Node/jest
 export const server = setupServer(...handlers);