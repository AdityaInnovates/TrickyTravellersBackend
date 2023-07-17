import joi from "joi";

export const login = {
  body: joi.object().keys({
    email: joi.string().email().trim().required(),
    password: joi.string().trim().required(),
  }),
};

export const register = {
  body: joi.object().keys({
    name: joi.string().trim().required(),
    password: joi.string().trim().required(),
    email: joi.string().email().trim().required(),
  }),
};
