import { Router } from 'express';
import { UsersController } from '../../controllers';
import { joiValidator } from '../../../utils/middleware';

const { validateBody, schemas } = joiValidator;

const router = Router();

router.route('/')
  .get(UsersController.index);

router.route('/signup')
  .post(validateBody(schemas.authSchema), UsersController.signUp);

router.route('/signIn')
  .post(UsersController.signIn);

router.get('/secret')
  .get(UsersController.secret);

export default router;