import { StatusCodes } from "http-status-codes";
import { Event as Model } from "../models";
import { Event } from "../models/event.model";
import ApiError from "../utils/ApiError";

export const getById = async (id: string) => {
  const data = await Model.findById(id);
  if (!data) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Invalid ID");
  }
  return data;
};

export const create = async (data: any) => {
  const blog = await Model.create({
    ...data,
  });
  return blog;
};

export const query = async (filter: any, options: any) => {
  const categories = await Model.paginate(filter, options);
  return categories;
};

export const update = async (id: string, data: any) => {
  const result = await getById(id);
  Object.assign(result, {
    ...data,
  });
  await result.save();
  return result;
};

export const deleteDocument = async (id: string) => {
  const data = await getById(id);
  await data.remove();
  return "Entry Deleted";
};

export const agentUpdate = async (id: string, data: any) => {
  return await update(id, data);
};