import joi from "joi";

export const create = {
  body: joi.object({
    title: joi.string().required().trim(),
    description: joi.string().required().trim(),
    video: joi.string().required().trim(),
    category_id: joi.string().required().trim(),
    keywords: joi.array().items(joi.string().required().trim()),
    images: joi.array().items(joi.string().required().trim()).required(),

    tiers: joi
      .array()
      .items(
        joi
          .object({
            images: joi
              .array()
              .items(joi.string().required().trim())
              .required(),
            title: joi.string().trim().required(),
            description: joi.string().trim().required(),
            price: joi.number().required(),
            discount: joi.number().optional().min(0).max(100),
          })
          .required()
      )
      .required(),
  }),
};

export const update = {
  params: joi.object({ id: joi.string().required().trim() }),
  body: joi.object({
    title: joi.string().optional().trim(),
    body: joi.string().optional().trim(),
    venue: joi.string().optional().trim(),
    location_id: joi.string().optional().trim(),
    date: joi.string().optional(),
    price: joi.number().optional(),
    keywords: joi.array().items(joi.string().required().trim()).optional(),
    category_id: joi.string().trim().optional(),
    faqs: joi
      .array()
      .items(
        joi.object({
          _id: joi.string().trim().optional(),
          question: joi.string().trim().required(),
          answer: joi.string().trim().required(),
        })
      )
      .optional(),
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

export const ticket = {
  body: joi.object({
    event: joi.string().required().trim(),
    name: joi.string().trim().required(),
    tier: joi.string().required().trim(),
    email: joi.string().required().trim(),
    phone: joi.string().required().trim(),
  }),
};
