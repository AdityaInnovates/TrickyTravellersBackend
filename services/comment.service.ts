import mongoose from "mongoose";
import { Comments as Model, User } from "../models";
import ApiError from "../utils/ApiError";

export const getById = async (id: string) => {
  const data = await Model.findById(id).populate([
    "comments.user_id",
    "comments.replies.user_id",
  ]);

  console.log(data, id);
  // if (!data) {
  //   throw new ApiError(404, "Invalid Id");
  // }
  return data;
};

export const addComment = async (data: any, id?: string) => {
  if (id) {
    const res = await getById(id);
    res.comments.push(data);
    await res.save();
    return res;
  } else {
    const res = await Model.create({ comments: [data] });
    return res;
  }
};

export const addReply = async (data: any, id: string, comment: string) => {
  const res = await getById(id);
  const commentIndex = res.comments.findIndex(
    (item: any) => item._id.toString() === comment
  );
  if (commentIndex === -1) {
    throw new ApiError(404, "Invalid Comment id");
  }

  res.comments[commentIndex].replies.push(data);
  await res.save();
  return res;
};
