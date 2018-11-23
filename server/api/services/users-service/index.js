import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../../config';
import { UserModel } from '../../../db/models';

export default {

  createUser: async (payload) => {

    try {

      const { username, email, password } = payload;

      // Checking if there is already a registered username / email 
      const emailCheck = await UserModel.findOne({ email });
      const usernameCheck = await UserModel.findOne({ username });

      if (emailCheck || usernameCheck) {
        // Generate & return error
        throw new Error('Username/Email is already taken');
      } else {
        // Create a new user model using payload
        const newUser = new UserModel({ username, email, password });

        // Save new user model into DB & return results
        return await newUser.save();
      }

    } catch (error) {
      throw error;
    }

  },

  signToken: async user => {

    try {
      // Await & return signed JSON web token
      return await jwt.sign({
        iss: 'TsukiSystems',
        sub: user.id,
        iat: new Date().getTime(), // Current Date
        exp: new Date().setDate(new Date().getDate() + 1) // Current Date + 1 Day
      }, JWT_SECRET);

    } catch (error) {
      throw error;
    }

  }

};