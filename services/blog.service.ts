import { StatusCodes } from "http-status-codes";
import { Blog as Model } from "../models";
import { Blog } from "../models/blogs.model";
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
    featured: data.files.featured[0].path,
    // extra_image: data.files.extra_image[0].path,
  });
  return blog;
};

export const query = async (filter: any, options: any) => {
  if (Object.keys(filter).length > 0) {
    const categories = await Model.find(filter).populate([
      "created_by",
      "category_id",
    ]);
    return categories;
  }
  const categories = await Model.paginate(filter, options);
  return categories;
};

export const update = async (id: string, data: any) => {
  const result = await getById(id);
  Object.assign(result, {
    ...data,
    slug:
      data?.title?.toLowerCase()?.split(" ").join("-") + "-" + data.created_by,
    ...(data.files?.featured ? { featured: data.files.featured[0].path } : {}),
    // ...(data.files.extra ? { extra: data.files.extra_image[0].path } : {}),
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
