import { rest } from 'msw';
 import { User } from '../hooks/useUsers';
 let users: User[] = [
 { id: 1, name: 'Alice' },
 { id: 2, name: 'Bob' },
 ];
 export const handlers = [
 // GET /users
rest.get('/users', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(users));
 }),
 // POST /users
 rest.post('/users', async (req, res, ctx) => {
 const { name } = await req.json<{ name: string }>();
 if (!name) res(ctx.status(400), ctx.json({ error: 'name is required' }));
 const newUser = { id: users.length + 1, name };
 users.push(newUser);
 return res(ctx.status(201), ctx.json(newUser));
 }),
 ];