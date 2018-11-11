import { UsersService } from '../../services';

export default {

  index: (req, res, next) => {
    res.status(200).json({
      message: `Users-Controller handling GET request to ${req.baseUrl}`
    });
  },

  signUp: async (req, res, next) => {

    try {

      if(!req.is('application/json')) {
        return next(new Error("Expected 'application/json'"));
      }

      const payload = req.value.body;
      const result = await UsersService.createUser(payload);

      res.status(201).json({
        message: `Users-Controller handling sign up POST request to ${req.baseUrl}`,
        result: result,
      });

    } catch (error) {
      next(error);
    }

  },

  signIn: (req, res, next) => {
    res.status(200).json({
      message: `Users-Controller handling sign in POST request to ${req.baseUrl}`
    });
  },

  secret: (req, res, next) => {
    res.status(200).json({
      message: `Users-Controller handling secret GET request to ${req.baseUrl}`
    });
  },

}