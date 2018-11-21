import passport from 'passport';
require('./Strategy');

export default {
  jwtAuth: passport.authenticate('jwt', { session: false }),
};