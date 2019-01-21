import { Router } from 'express';
import { UsersController, PassportController } from '../../controllers';
import { joiValidator } from '../../../utils/middleware';

const { validateBody, Schemas } = joiValidator;
const router = Router();

router.route('/')
  .get(UsersController.index);

router.route('/signup')
  .post(validateBody(Schemas.registerSchema), UsersController.signUp);

router.route('/login')
  .post(validateBody(Schemas.authSchema), PassportController.localAuth, UsersController.login);

router.route('/oauth/google')
  .post(validateBody(Schemas.googleAuthSchema), PassportController.googleAuth, UsersController.googleLogin);

router.route('/secret')
  .get(PassportController.jwtAuth, UsersController.secret);

export default router;