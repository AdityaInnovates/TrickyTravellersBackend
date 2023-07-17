import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";

import { BlogService } from "../services";

export const get = catchAsync(async (req: Request, res: Response) => {
  const data = await BlogService.query({ ...req.params }, {});
  return res.json(data);
});

export const create = catchAsync(async (req: Request, res: Response) => {
  const data = await BlogService.create({ ...req.body, files: req.files });

  return res.json(data);
});

export const deleteDocument = catchAsync(
  async (req: Request, res: Response) => {
    const data = await BlogService.deleteDocument(req.params.id);
    return res.json(data);
  }
);

export const update = catchAsync(async (req: Request, res: Response) => {
  const data = await BlogService.update(req.params.id, {
    ...req.body,
    files: req.files,
  });
  return res.json(data);
});

export const getSingle = catchAsync(async (req: Request, res: Response) => {
  const data = await BlogService.getById(req.params.id);

  return res.json(data);
});
