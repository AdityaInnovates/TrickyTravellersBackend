import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";

export const upload = catchAsync(async (req: Request, res: Response) => {
  res.json(req.files);
});
