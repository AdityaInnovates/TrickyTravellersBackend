import { Request, Response } from "express";
import { TokenService, UserService } from "../services";
import catchAsync from "../utils/catchAsync";

export const login = catchAsync(async (req: Request, res: Response) => {
  const user = await UserService.login(req.body);
  const token = await TokenService.generateToken(user);
  return res.json({ user, token });
});

export const register = catchAsync(async (req: Request, res: Response) => {
  console.log(req.body);
  const user = await UserService.createUser(req.body);
  return res.json("User Has Been created");
});

export const update_profile = catchAsync(
  async (req: Request, res: Response) => {
    const user: any = req.user;
    const data = await UserService.updateUser(req.body, user);
    res.json(data);
  }
);

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
