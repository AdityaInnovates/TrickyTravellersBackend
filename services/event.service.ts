import { StatusCodes } from "http-status-codes";
import { Event as Model } from "../models";
import { Event } from "../models/event.model";
import ApiError from "../utils/ApiError";

export const getById = async (id: string) => {
  const data = await Model.findById(id).populate([
    "category_id",
    "created_by",
    "approved_by",
  ]);
  if (!data) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Invalid ID");
  }
  return data;
};

export const create = async (data: any) => {
  const blog = await Model.create({
    ...data,
    slug:
      data?.title?.toLowerCase()?.split(" ").join("-") + "-" + data.created_by,
    ...(data.files?.image ? { image: data.files.image[0].path } : {}),
  });
  return blog;
};

export const query = async (filter: any, options: any) => {
  const categories = await Model.paginate(filter, options);
  return categories;
};

export const update = async (id: string, data: any) => {
  const result = await getById(id);
  const created_by: any = result.created_by;
  Object.assign(result, {
    ...data,
    slug:
      (data.title
        ? data?.title?.toLowerCase()?.split(" ").join("-")
        : result.title.toLowerCase().split(" ").join("-")) +
      "-" +
      created_by.username,
    ...(data.files?.image ? { image: data.files.image[0].path } : {}),
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

export const comment = async (id: string, data: any) => {
  const result = await Model.findById(id);
  result?.comments.push(data);
  await result?.save();
  const blog = await getById(id);
  return blog;
};
