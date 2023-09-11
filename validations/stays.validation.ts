import joi from "joi";

export const create = {
  body: joi.object({
    title: joi.string().required().trim(),
    body: joi.string().required().trim(),
    address: joi.string().required().trim(),

    keywords: joi.array().items(joi.string().required().trim()),
    price: joi.number().required(),
    facilities: joi.array().items(joi.any()),
    discount: joi.number().optional().min(0).max(100),
  }),
};

export const update = {
  params: joi.object({ id: joi.string().required().trim() }),
  body: joi.object({
    title: joi.string().required().trim(),
    body: joi.string().required().trim(),
    address: joi.string().required().trim(),

    keywords: joi.array().items(joi.string().required().trim()),
    price: joi.number().required(),
    facilities: joi.array().items(joi.any()),
    discount: joi.number().optional().min(0).max(100),
  }),
};

export const agentUpdate = {
  params: joi.object({ id: joi.string().required().trim() }),
  body: joi.object({
    status: joi.number().required().min(1),
    reject_reason: joi.string().trim().optional(),
  }),
};
