import passport from 'passport';
import { ExtractJwt } from 'passport-jwt';

import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '../../../../config';
import { JWT_SECRET } from '../../../../config';
import { UserModel } from '../../../../db/models';
import { PassportService } from '../../../services';

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
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Check DB if Google Email already exists
    const matchGoogleEmail = await UserModel.findOne({ "profile.email": profile.emails[0].value });
    if (matchGoogleEmail) {
      if (matchGoogleEmail.profile.googleId === undefined) {
          const updatedUser = await PassportService.googleOAuthUpdate(profile);
          return done(null,  updatedUser);
      } else { return done(null, matchGoogleEmail); } 
    }

    // Create new User with GoogleId
    const newGoogleUser =  await PassportService.googleOAuthCreate(profile);
    return done(null, newGoogleUser);

  } catch (error) {
    done(error, false, error.message);
  }
}));

// LOCAL STRATEGY
passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  try {
  // Find the user given the email
  const query = await UserModel.findOne({ "profile.email": email });

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