import { Router } from 'express';
import usersRouter from './Users';

const router = Router();

router.use('/users', usersRouter);

export default router;