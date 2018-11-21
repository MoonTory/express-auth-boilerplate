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

  signIn: () => {
      const payload = { message: `Users-Controller handling sign in POST request to `  };
      return payload;
  },

};