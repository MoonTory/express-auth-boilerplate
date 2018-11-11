import joi from 'joi';
import schemas from './schemas';

export default {

  validateBody: (schema) => {
    return (req, res, next) => {
      const result = joi.validate(req.body, schema);

      if (result.error) {
        next(result.error);
      }

      if (!req.value) { req.value = {}; }
      
      req.value['body'] = result.value;
      next();
    }
  },

  schemas,

};