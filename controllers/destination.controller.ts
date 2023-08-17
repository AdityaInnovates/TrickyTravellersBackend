import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { DestinationService } from "../services";

export const get = catchAsync(async (req: Request, res: Response) => {
  const data = await DestinationService.query(
    { ...req.query },
    {} // { populate: "created_by ,category_id" }
  );
  return res.json(data);
});

export const create = catchAsync(async (req: Request, res: Response) => {
  const data = await DestinationService.create({
    ...req.body,
    files: req.files,
  });
  return res.json(data);
});

export const deleteDocument = catchAsync(
  async (req: Request, res: Response) => {
    const data = await DestinationService.deleteDocument(req.params.id);
    return res.json(data);
  }
);

export const update = catchAsync(async (req: Request, res: Response) => {
  const data = await DestinationService.update(req.params.id, req.body);
  return res.json(data);
});

export const getSingle = catchAsync(async (req: Request, res: Response) => {
  const data = await DestinationService.getById(req.params.id);

  return res.json(data);
});
