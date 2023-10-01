import joi from "joi";

export const create = {
  body: joi.object({
    title: joi.string().required().trim(),
    body: joi.string().required().trim(),
    address: joi.string().required().trim(),

    keywords: joi.array().items(joi.string().required().trim()),
    images: joi.array().items(joi.string().required().trim()).required(),

    facilities: joi.array().items(joi.any()),
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
            amenities: joi
              .array()
              .items(joi.string().trim().required().required())
              .required(),
            other_details: joi.string().trim().optional(),
          })
          .required()
      )
      .required(),
  }),
};

export const update = {
  params: joi.object({ id: joi.string().required().trim() }),
  body: joi.object({
    title: joi.string().required().trim(),
    body: joi.string().required().trim(),
    address: joi.string().required().trim(),

    keywords: joi.array().items(joi.string().required().trim()),
    images: joi.array().items(joi.string().required().trim()).required(),

    facilities: joi.array().items(joi.any()),
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
            amenities: joi
              .array()
              .items(joi.string().trim().required().required())
              .required(),
            other_details: joi.string().trim().optional(),
          })
          .required()
      )
      .required(),
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
  body: joi.object({
    comment: joi.string().trim().required(),
    rating: joi.number().max(5).min(1).required(),
  }),
};
