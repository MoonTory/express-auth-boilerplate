import { Router } from 'express';
import { UsersController, PassportController } from '../../controllers';
import { joiValidator } from '../../../utils/middleware';
import User from '../../../db/models/User';

const { validateBody, schemas } = joiValidator;

const router = Router();

router.route('/')
  .get(UsersController.index);

router.route('/signup')
  .post(validateBody(schemas.registerSchema), UsersController.signUp);

router.route('/login')
  .post(validateBody(schemas.authSchema), PassportController.localAuth, UsersController.login);

router.route('/oauth/google')
  .post(validateBody(schemas.googleAuthSchema), PassportController.googleAuth, UsersController.googleOAuth);

router.route('/secret')
  .get(PassportController.jwtAuth, UsersController.secret);

export default router;