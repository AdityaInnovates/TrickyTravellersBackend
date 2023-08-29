import { User as Model } from "../models";

import { StatusCodes } from "http-status-codes";
import ApiError from "../utils/ApiError";

export const findUser = async (email: string) => {
  const fields = [
    "name",
    "password",
    "email",
    "role",
    "active",
    "ban",
    "google_id",
    "remember_token",
    "profile_photo_path",
  ];
  const user = await Model.findOne({ email }).select(fields.join(" "));

  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Invalid email");
  }
  return user;
};

export const query = async (filter: any, options: any) => {
  console.log(filter);
  const users = await Model.paginate(filter, options);
  return users;
};

export const login = async (data: { email: string; password: string }) => {
  const user = await findUser(data.email);
  if (!user.active) {
    throw new ApiError(StatusCodes.FORBIDDEN, "User not activated yet");
  }
  const pass = await user.isPasswordMatch(data.password);
  console.log(pass);
  if (!pass) {
    throw new ApiError(StatusCodes.FORBIDDEN, "Invalid Username or password");
  } else return user;
};

export const createUser = async (body: any) => {
  if (await Model.isEmailTaken(body.email)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "email already in use");
  }
  const user = await Model.create({ ...body });
  return user;
};

export const updateUser = async (body: any, user: any) => {
  console.log(body, user);
  Object.assign(user, {
    ...body,
    ...(body.files.cover ? { cover_photo_path: body.files.cover[0].path } : {}),
    ...(body.files.profile
      ? { profile_photo_path: body.files.profile[0].path }
      : {}),
  });

  await user.save();
  return user;
};
