import { StatusCodes } from "http-status-codes";
import { Stays as Model } from "../models";
import ApiError from "../utils/ApiError";
import { CommentService } from ".";

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
  });
  return stays;
};

export const query = async (filter: any, options: any) => {
  if (Object.keys(filter).length > 0) {
    const result = await Model.find(filter).populate(["user_id"]);

    return result;
  }
  const result = await Model.paginate(filter, options);
  return result;
};

export const update = async (id: string, data: any) => {
  const result = await getById(id);
  const user: any = result.user_id;
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

export const comment = async (id: string, data: any) => {
  const result: any = await Model.findById(id);
  const comment = await CommentService.addComment(
    data,
    result.comments ? String(result?.comments) : undefined
  );
  if (!result.comments) {
    result.comments = comment.id;
    await result.save();
  }
  return result;
};
