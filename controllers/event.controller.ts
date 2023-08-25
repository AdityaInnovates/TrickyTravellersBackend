import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";

import { EventService } from "../services";

export const get = catchAsync(async (req: Request, res: Response) => {
  const data = await EventService.query({ ...req.query }, {});
  return res.json(data);
});

export const create = catchAsync(async (req: Request, res: Response) => {
  const user: any = req.user;
  const data = await EventService.create({
    ...req.body,
    files: req.files,
    created_by: user.id,
  });

  return res.json(data);
});

export const deleteDocument = catchAsync(
  async (req: Request, res: Response) => {
    const data = await EventService.deleteDocument(req.params.id);
    return res.json(data);
  }
);

export const update = catchAsync(async (req: Request, res: Response) => {
  const data = await EventService.update(req.params.id, {
    ...req.body,
    files: req.files,
  });
  return res.json(data);
});

export const getSingle = catchAsync(async (req: Request, res: Response) => {
  const data = await EventService.getById(req.params.id);

  return res.json(data);
});

export const agentUpdate = catchAsync(async (req: Request, res: Response) => {
  const user: any = req.user;
  const data = await EventService.agentUpdate(req.params.id, {
    approved_by: user.id,
    ...req.body,
  });
  return res.json(data);
});
