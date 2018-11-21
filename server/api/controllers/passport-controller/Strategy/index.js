import passport from 'passport';
import { JWT_SECRET } from '../../../../config';
import { UserModel } from '../../../../db/models';
import { ExtractJwt } from 'passport-jwt';

const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
  secretOrKey: JWT_SECRET
}, async (payload, done) => {
  try {
    // Find the user specified in token
    const query = await UserModel.findById(payload.sub);

    // If user doesn't exist, handle it
    if (!query) {
      return done(null, false);
    }

    // Otherwise, return the user
    done(null, query);
  } catch (error) {
    done(error, false);
  }
}));

// LOCAL STRATEGY
passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  // Find the user given the email
  const query = await UserModel.findOne({ email });

  // If not, handle it
  if (!query) {
    return done(null, false);
  }

  // Check if the password is correct

  // If not, handle it

  // Otherwise, return the user
}));