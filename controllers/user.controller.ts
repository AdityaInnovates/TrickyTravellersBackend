import { Request, Response } from "express";
import {
  MailService,
  NotificationService,
  TokenService,
  UserService,
} from "../services";
import catchAsync from "../utils/catchAsync";
import passport from "passport";
import config from "../config/config";
import ApiError from "../utils/ApiError";
import { StatusCodes } from "http-status-codes";
import { User } from "../models";
export const login = catchAsync(async (req: Request, res: Response) => {
  const user = await UserService.login(req.body);
  const token = await TokenService.generateToken(user);
  return res.json({ user, token });
});

export const register = catchAsync(async (req: Request, res: Response) => {
  const user = await UserService.createUser(req.body);
  const token = await TokenService.generateToken(user);
  await MailService.sendVerifyEmail(req.body.email, token);
  return res.json("User Has Been created");
});

export const update_profile = catchAsync(
  async (req: Request, res: Response) => {
    const user: any = req.user;
    const data = await UserService.updateUser(
      { ...req.body, files: req.files },
      user
    );
    res.json(data);
  }
);

export const verify = catchAsync(async (req: Request, res: Response) => {
  const user: any = req.user;
  const data = await UserService.updateUser({ active: true }, user);
  res.status(200).send("User Verified");
});

export const change_password = catchAsync(
  async (req: Request, res: Response) => {
    const user: any = req.user;
    const data = await UserService.login({
      email: user.email,
      password: req.body.old_password,
    });
    const body = { password: req.body.new_password };
    await UserService.updateUser(body, data);

    res.json("Password Updated");
  }
);

export const get = catchAsync(async (req: Request, res: Response) => {
  const data = await UserService.query(
    req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { username: { $regex: req.query.search, $options: "i" } },
          ],
          active: true,
        }
      : req.query.slug
      ? { slug: req.query.slug }
      : { ...req.query },
    { ...req.query }
  );
  return res.json(data);
});

export const googleSuccess = catchAsync(async (req: Request, res: Response) => {
  if (req.user) {
    const payload: any = req.user;
    const user: any = await User.findOne({ email: payload.email });
    const token = await TokenService.generateToken(user);
    if (!user?.google_id) {
      user.google_id = payload.id;
      await user?.save();
    }

    return res.json({ user, token });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

export const googleFailed = catchAsync(async (req: Request, res: Response) => {
  res.status(403).json({ error: true, message: "Not Authorized" });
});

export const follow = catchAsync(async (req: Request, res: Response) => {
  const user: any = req.user;
  const data = await UserService.follow(user.id, req.params.id);
  await UserService.addFollower(req.params.id, user.id);
  await NotificationService.create(
    req.params.id,
    "User Update",
    `<a href={/profile/?_id=${user.id}}>${user.name}</a> has followed you`
  );
  res.json(data);
});
