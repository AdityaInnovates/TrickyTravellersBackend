import { Request, Response } from "express";
import { MailService, TokenService, UserService } from "../services";
import catchAsync from "../utils/catchAsync";

export const login = catchAsync(async (req: Request, res: Response) => {
  const user = await UserService.login(req.body);
  const token = await TokenService.generateToken(user);
  return res.json({ user, token });
});

export const register = catchAsync(async (req: Request, res: Response) => {
  console.log(req.body);
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
  console.log(req.query);
  const data = await UserService.query(
    req.query.slug ? { slug: req.query.slug } : { ...req.query },
    { ...req.query }
  );
  return res.json(data);
});
