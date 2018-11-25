import passport from 'passport';
import { JWT_SECRET } from '../../../../config';
import { UserModel } from '../../../../db/models';
import { ExtractJwt } from 'passport-jwt';

const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const GoogleTokenStrategy = require('passport-google-plus-token');

// JWT TOKEN STRATEGY
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
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

// GOOGLE OAUTH STRATEGY
passport.use('googleToken', new GoogleTokenStrategy({
  authorizationURL: '',
  clientID: '132676015972-730eb1s2tc76pe3q818vhu3h02m8594e.apps.googleusercontent.com',
  clientSecret: '7ekTmsETZ5GtsKEgrUSn_JHI'
}, async (accessToken, refreshToken, profile, done) => {
  console.log('accessToken', accessToken);
  console.log('refreshToken', refreshToken);
  console.log('profile', profile);
}));

// LOCAL STRATEGY
passport.use(new LocalStrategy({
  usernameField: 'username'
}, async (username, password, done) => {
  try {
  // Find the user given the email
  const query = await UserModel.findOne({ username });

  // If not, handle it
  if (!query) {
    return done(null, false);
  }

  const isMatch = await query.isValidPassword(password);

  // If not, handle it
  if (!isMatch) {
    return done(null, false);
  }

  // Otherwise, return the user
  done(null, query);

  } catch(error) {
    done(error, false);
  }
}));