import { Router } from 'express';
import { UsersController } from '../../controllers';

const router = Router();

router.route('/')
  .get(UsersController.index);

router.route('/signup')
  .post(UsersController.signUp);

router.route('/signIn')
  .post(UsersController.signIn);

router.get('/secret')
  .get(UsersController.secret);

export default router;