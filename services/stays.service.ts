import { StatusCodes } from "http-status-codes";
import { Stays as Model } from "../models";
import ApiError from "../utils/ApiError";

export const getById = async (id: string) => {
  const data = await Model.findById(id).populate(["user_id", "approved_by"]);
  if (!data) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Invalid ID");
  }
  return data;
};

export const create = async (data: any) => {
  const stays = await Model.create({
    ...data,
    image: data.files.image[0].path,
    slug: data?.title?.toLowerCase()?.split(" ").join("-") + "-" + data.user_id,
  });
  return stays;
};

export const query = async (filter: any, options: any) => {
  if (Object.keys(filter).length > 0) {
    const result = await Model.find(filter).populate(["user_id"]);
    console.log(result);
    return result;
  }
  const result = await Model.paginate(filter, options);
  console.log(result);
  return result;
};

export const update = async (id: string, data: any) => {
  const result = await getById(id);
  Object.assign(result, {
    ...data,
    ...(data.files?.image ? { image: data.files.image[0].path } : {}),
    slug:
      (data.title
        ? data?.title?.toLowerCase()?.split(" ").join("-")
        : result.title.toLowerCase().split(" ").join("-")) +
      "-" +
      result.user_id._id,
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
