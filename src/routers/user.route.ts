import { Router } from 'express';
import { UserAddModel } from '../models/user';
import { UserService } from '../services/user.service';

export const userRouter = Router();
const userService = new UserService();

userRouter.post('/login', async (req, res) => {
  const payload = req.body as UserAddModel;
  const user = await userService.login(payload);
  return res.json(user);
});

userRouter.post('/register', async (req, res) => {
  const payload = req.body as UserAddModel;
  const user = await userService.register(payload);
  return res.json(user);
});