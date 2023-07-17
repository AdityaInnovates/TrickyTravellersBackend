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
  return res.json({ message: "User Has Been created" });
});
