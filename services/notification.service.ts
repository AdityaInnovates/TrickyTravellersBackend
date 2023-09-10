import { Notification as Model } from "../models";

export const create = async (
  user: string,
  title: string,
  notification: string
) => {
  return await Model.create({ user, title, notification });
};
