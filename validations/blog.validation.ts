import joi from "joi";

export const create = {
  body: joi.object({
    title: joi.string().required().trim(),
    content: joi.string().required().trim(),
    category_id: joi.string().required().trim(),
    keywords: joi.array().items(joi.string().required().trim()),
  }),
};

export const update = {
  params: joi.object({ id: joi.string().required().trim() }),
  body: joi.object({
    title: joi.string().optional().trim(),
    content: joi.string().optional().trim(),
    category_id: joi.string().optional().trim(),
    keywords: joi.array().items(joi.string().required().trim()).optional(),
    status: joi.number().equal(3).optional(),
  }),
};

export const agentUpdate = {
  params: joi.object({ id: joi.string().required().trim() }),
  body: joi.object({
    status: joi.number().required().min(1),
    reject_reason: joi.string().trim().optional(),
  }),
};

export const comment = {
  params: joi.object({ id: joi.string().required().trim() }),
  body: joi.object({ comment: joi.string().trim().required() }),
};

export const reply = {
  params: joi.object({
    blog: joi.string().required().trim(),
    comment: joi.string().required().trim(),
  }),
  body: joi.object({ comment: joi.string().trim().required() }),
};
