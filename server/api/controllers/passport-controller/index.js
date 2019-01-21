import passport from 'passport';
require('./Strategies');

export default {
  jwtAuth: passport.authenticate('jwt', { session: false }),
  localAuth: passport.authenticate('local', { session: false }),
  googleAuth: passport.authenticate('googleToken', { session: false })
};