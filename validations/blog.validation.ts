import joi from "joi";

export const create = {
  body: joi.object({
    title: joi.string().required().trim(),
    content: joi.string().required().trim(),
    category_id: joi.string().required().trim(),
    slug: joi.string().required().trim(),
    keywords: joi.array().items(joi.string().required().trim()),
  }),
};

export const update = {
  params: joi.object({ id: joi.string().required().trim() }),
  body: joi.object({
    title: joi.string().required().trim(),
    content: joi.string().required().trim(),
    category_id: joi.string().required().trim(),
    slug: joi.string().required().trim(),
    keywords: joi.array().items(joi.string().required().trim()),
  }),
};