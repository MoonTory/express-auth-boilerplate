import { UsersService } from '../../services';

export default {

  // Index Controller Middleware
  index: (req, res, next) => {
    res.status(200).json({
      message: `Users-Controller handling GET request to ${req.baseUrl}`
    });
  },

  // SignUp Controller Middleware
  signUp: async (req, res, next) => {
    try {

      if(!req.is('application/json')) {
        return next(new Error("Expected 'application/json'"));
      }

      const payload = req.value.body;
      const result = await UsersService.createUser(payload);

      // Check if result undefined then "User" already exists, handle accordingly.
      if (result === undefined) {
        res.status(409).json({
          payload: {
            message: 'Username/Email already in use'
          }
        })
      }
      
      // Else valid User was created/updated sign and return JWT Token to client.
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

  // Login Controler Middleware
  login: async (req, res, next) => {
    const token = await UsersService.signToken(req.user);

    res.status(200).json({
      payload: {
        message: `Users-Controller handling login POST request to ${req.baseUrl}`,
        token: token,
      }
    });
  },

<<<<<<< HEAD
  googleLogin: async (req, res, next) => {
=======
  // Google OAuth Controller Middleware
  googleOAuth: async (req, res, next) => {
>>>>>>> 394fa740f05117f54b18b3016ca2a69bc34c948a
    const token = await UsersService.signToken(req.user);

    res.status(200).json({
      payload: {
        message: `Users-Controller handling login POST request to ${req.baseUrl}`,
        token: token,
      }
    });
  },

  // Secret Controler Middleware
  secret: async (req, res, next) => {
    console.log('Success!!');
    res.status(200).json({
      message: `Users-Controller handling secret GET request to ${req.baseUrl}`
    });
  },

}