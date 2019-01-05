import { UserModel } from '../../../db/models';

export default {
  googleOAuthUpdate: async profile => {
    try {
      const updatedUser = await UserModel.findOneAndUpdate({ "profile.email": profile.emails[0].value }, { $set: { "profile.googleId": profile.id }});
      return updatedUser;
    } catch (error) {
      throw error;
    }
  },

  updateGoogleWithPassword: async payload => {
    try {
      // Updates a Google Created Account with no Password
      let updatedUser = new UserModel();
      payload.password = await updatedUser.hashPassword(payload.password);
      updatedUser = await UserModel.findOneAndUpdate({ "profile.email": payload.email }, 
        { $set: { "profile.username": payload.username, "profile.password": payload.password }});

      return updatedUser;
    } catch (error) {
      throw error;
    }
  },

  googleOAuthCreate: async profile => {
    try {
      // Create new User with GoogleId
      const newGoogleUser = new UserModel({
        profile: {
          method: 'google',
          username: profile.name.givenName,
          email: profile.emails[0].value,
          googleId: profile.id
        }
      });

      return await newGoogleUser.save();
    } catch (error) {
      throw error;
    }
  },
};