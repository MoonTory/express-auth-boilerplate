import joi from 'joi';

export default {

    registerSchema: joi.object().keys({
      username: joi.string().required(),
      email: joi.string().email().required(),
      password: joi.string().required(),
    }),
    authSchema: joi.object().keys({
      username: joi.string().required(),
      password: joi.string().required(),
    }),

}