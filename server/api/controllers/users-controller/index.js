export default {

  index: (req, res, next) => {
    res.status(200).json({
      message: `Users-Controller handling GET request to ${req.baseUrl}`
    });
  },

  signUp: (req, res, next) => {
    res.status(200).json({
      message: `Users-Controller handling sign up POST request to ${req.baseUrl}`
    });
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