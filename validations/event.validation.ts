import joi from "joi";
export interface Event {
  body: string;
  date: Date;
  keywords: [string];
  location_id: string;
  price: number;
  slug: string;
  title: string;
  venue: string;
}

export const create = {
  body: joi.object({
    title: joi.string().required().trim(),
    body: joi.string().required().trim(),
    venue: joi.string().required().trim(),
    location_id: joi.string().required().trim(),
    date: joi.date().required(),
    price: joi.number().required(),
    keywords: joi.array().items(joi.string().required().trim()),
    category_id: joi.string().trim().required(),
  }),
};

export const update = {
  params: joi.object({ id: joi.string().required().trim() }),
  body: joi.object({
    title: joi.string().required().trim(),
    body: joi.string().required().trim(),
    venue: joi.string().required().trim(),
    location_id: joi.string().required().trim(),
    date: joi.date().required(),
    price: joi.number().required(),
    keywords: joi.array().items(joi.string().required().trim()),
    category_id: joi.string().trim().required(),
  }),
};

export const agentUpdate = {
  params: joi.object({ id: joi.string().required().trim() }),
  body: joi.object({
    status: joi.number().required().max(2).min(1),
    reject_reason: joi.string().trim().optional(),
  }),
};
