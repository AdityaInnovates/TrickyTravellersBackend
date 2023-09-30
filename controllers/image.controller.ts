import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";

export const upload = catchAsync(async (req: Request, res: Response) => {
  res.json(req.files);
});

export const uploadBulk = catchAsync(async (req: Request, res: Response) => {
  const files: any = req.files;
  res.json(req.files);
});
