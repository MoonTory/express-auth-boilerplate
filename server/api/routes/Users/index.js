import { Router } from 'express';
import { UsersController, PassportController } from '../../controllers';
import { joiValidator } from '../../../utils/middleware';

const { validateBody, schemas } = joiValidator;

const router = Router();

router.route('/')
  .get(UsersController.index);

router.route('/signup')
  .post(validateBody(schemas.authSchema), UsersController.signUp);

router.route('/signIn')
  .post(UsersController.signIn);

router.route('/secret')
  .get(PassportController.jwtAuth ,UsersController.secret);

export default router;