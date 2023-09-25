import joi from "joi";

export const create = {
  body: joi.object({
    title: joi.string().required().trim(),
    body: joi.string().required().trim(),
    address: joi.string().required().trim(),

    keywords: joi.array().items(joi.string().required().trim()),

    facilities: joi.array().items(joi.any()),
    discount: joi.number().optional().min(0).max(100),
    tiers: joi
      .array()
      .items(
        joi
          .object({
            title: joi.string().trim().required(),
            description: joi.string().trim().required(),
            price: joi.number().required(),
            amenities: joi
              .array()
              .items(joi.string().trim().required().required())
              .required(),
            other_details: joi.array().items(joi.string().trim().required()),
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
    address: joi.string().optional().trim(),

    keywords: joi.array().items(joi.string().required().trim()).optional(),

    facilities: joi.array().items(joi.any()).optional(),
    discount: joi.number().optional().min(0).max(100),
    tiers: joi
      .array()
      .items(
        joi
          .object({
            title: joi.string().trim().required(),
            description: joi.string().trim().required(),
            price: joi.number().required(),
            amenities: joi
              .array()
              .items(joi.string().trim().required().required())
              .required(),
            other_details: joi.array().items(joi.string().trim().required()),
          })
          .required()
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
