import { TicketService } from "../services";
import catchAsync from "../utils/catchAsync";
import { Request, Response } from "express";

export const get = catchAsync(async (req: Request, res: Response) => {
  const result = await TicketService.query(req.query);
  res.json(result);
});

export const create = catchAsync(async (req: Request, res: Response) => {
  const user: any = req.user;
  const data = await TicketService.create({ ...req.body, user: user.id });
  res.json(data);
});
