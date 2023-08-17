import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";

import { StaysService } from "../services";

export const get = catchAsync(async (req: Request, res: Response) => {
  const data = await StaysService.query(
    req.query.slug ? { slug: req.query.slug } : {},
    { ...req.query, populate: "created_by,category_id" }
  );
  return res.json(data);
});

export const create = catchAsync(async (req: Request, res: Response) => {
  const user: any = req.user;
  const data = await StaysService.create({
    ...req.body,
    files: req.files,
    created_by: user.id,
  });

  return res.json(data);
});

export const deleteDocument = catchAsync(
  async (req: Request, res: Response) => {
    const data = await StaysService.deleteDocument(req.params.id);
    return res.json(data);
  }
);

export const update = catchAsync(async (req: Request, res: Response) => {
  const data = await StaysService.update(req.params.id, {
    ...req.body,
    files: req.files,
  });
  return res.json(data);
});

export const getSingle = catchAsync(async (req: Request, res: Response) => {
  const data = await StaysService.getById(req.params.id);

  return res.json(data);
});
