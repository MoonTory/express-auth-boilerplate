import joi from 'joi';

export default {

    authSchema: joi.object().keys({
      username: joi.string().required(),
      email: joi.string().email().required(),
      password: joi.string().required(),
    }),

}