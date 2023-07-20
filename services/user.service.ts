import { User as Model } from "../models";

import { StatusCodes } from "http-status-codes";
import ApiError from "../utils/ApiError";

export const findUser = async (email: string) => {
  const user = await Model.findOne({ email });

  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Invalid email");
  }
  return user;
};

export const login = async (data: { email: string; password: string }) => {
  const user = await findUser(data.email);
  const pass = await user.isPasswordMatch(data.password);
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
  Object.assign(user, body);

  await user.save();
  return user;
};
