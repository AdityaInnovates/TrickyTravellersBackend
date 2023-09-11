import joi from "joi";

export const create = {
  body: joi
    .object({
      title: joi.string().required().trim(),
      body: joi.string().required().trim(),
      venue: joi.string().required().trim(),
      location_id: joi.string().required().trim(),
      date: joi.string().required(),
      price: joi.number().required(),
      keywords: joi.array().items(joi.string().required().trim()).required(),
      category_id: joi.string().trim().required(),
      faqs: joi.array().items(
        joi.object({
          question: joi.string().trim().required(),
          answer: joi.string().trim().required(),
        })
      ),
    })
    .required(),
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
  }),
};

export const agentUpdate = {
  params: joi.object({ id: joi.string().required().trim() }),
  body: joi.object({
    status: joi.number().required().min(1),
    reject_reason: joi.string().trim().optional(),
  }),
};
