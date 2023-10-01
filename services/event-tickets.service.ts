import { Tickets as Model } from "../models";

export const create = async (data: any) => {
  const res = await Model.create({ ...data });
  return res;
};

export const query = async (filter: any) => {
  const tickets = Model.find(filter).populate(["user", "event"]);
  return tickets;
};
