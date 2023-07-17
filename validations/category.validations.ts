import joi from "joi";

export const create = {
  body: joi.object({ name: joi.string().required().trim() }),
};
