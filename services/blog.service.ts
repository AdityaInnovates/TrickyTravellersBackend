import { StatusCodes } from "http-status-codes";
import { Blog as Model } from "../models";
import { Blog } from "../models/blogs.model";
import ApiError from "../utils/ApiError";
import mongoose from "mongoose";

export const getById = async (id: string) => {
  const data = await Model.findById(id).populate([
    "category_id",
    "created_by",
    "approved_by",
    "comments.user_id",
    // "comment.replies.user_id",
    "likes",
    "content",
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
      data?.title?.toLowerCase()?.split(" ").join("-") +
      "-" +
      data.created_by.username,
    featured: data.files.featured[0].path,
    // extra_image: data.files.extra_image[0].path,
  });
  return blog;
};

export const query = async (filter: any, options: any) => {
  if (Object.keys(filter).length > 0) {
    const categories = await Model.find(filter).populate([
      "category_id",
      "created_by",
      "approved_by",
      // "comments.user_id",
      "likes",
      "content",
    ]);
    return categories;
  }
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
    ...(data.files?.featured ? { featured: data.files.featured[0].path } : {}),
    // ...(data.files.extra ? { extra: data.files.extra_image[0].path } : {}),
  });
  await result.save();
  const blog = await getById(id);
  return blog;
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

export const like = async (id: string, user: string) => {
  const data: any = await Model.findById(id);

  if (data.likes.includes(user)) {
    data.likes = data.likes.filter((item: string) => {
      return item.toString() !== user;
    });
  } else {
    data.likes.push(user);
  }
  await data.save();
  const result = await getById(id);
  return result;
};

export const reply = async (
  blog_id: string,
  comment_id: string,
  comment: string,
  user: string
) => {
  const blog = await getById(blog_id);
  console.log(blog.comments);
  const commentIndex = blog.comments.findIndex(
    (item: any) => item._id.toString() === comment_id
  );
  if (commentIndex === -1) {
    throw new ApiError(404, "Invalid Comment id");
  }
  const param = new mongoose.Types.ObjectId(user);
  blog.comments[commentIndex].replies.push({
    user_id: param,
    comment,
  });
  await blog.save();
  return blog;
};
