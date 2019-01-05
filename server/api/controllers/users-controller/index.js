import { UsersService } from '../../services';

export default {

  // Index controller middleware
  index: (req, res, next) => {
    res.status(200).json({
      message: `Users-Controller handling GET request to ${req.baseUrl}`
    });
  },

  // Sign up controller middleware
  signUp: async (req, res, next) => {
    try {

      if(!req.is('application/json')) {
        return next(new Error("Expected 'application/json'"));
      }

      const payload = req.value.body;
      const result = await UsersService.createUser(payload);
      const token = await UsersService.signToken(result);

      res.status(201).json({
        payload: {
          message: `Users-Controller handling sign up POST request to ${req.baseUrl}`,
          token: token,
        }
      });

    } catch (error) {
      next(error);
    }
  },

  // Login controller middleware
  login: async (req, res, next) => {
    const token = await UsersService.signToken(req.user);

    res.status(200).json({
      payload: {
        message: `Users-Controller handling login POST request to ${req.baseUrl}`,
        token: token,
      }
    });
  },

  googleOAuth: async (req, res, next) => {
    const token = await UsersService.signToken(req.user);

    res.status(200).json({
      payload: {
        message: `Users-Controller handling login POST request to ${req.baseUrl}`,
        token: token,
      }
    });
  },

  // Secret controller middleware
  secret: async (req, res, next) => {
    console.log('Success!!');
    res.status(200).json({
      message: `Users-Controller handling secret GET request to ${req.baseUrl}`
    });
  },

}