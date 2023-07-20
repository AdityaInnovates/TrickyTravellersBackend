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

export const update = {
  body: joi.object().keys({
    name: joi.string().trim().optional(),
  }),
};

export const change_password = {
  body: joi.object().keys({
    old_password: joi.string().trim().required(),
    new_password: joi.string().trim().required(),
  }),
};
