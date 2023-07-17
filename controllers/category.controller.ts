import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { Category as Model } from "../models";
import { Category } from "../models/category.model";
import { StatusCodes } from "http-status-codes";
import { CategoryService } from "../services";

export const get = catchAsync(async (req: Request, res: Response) => {
  const data = await CategoryService.query(
    { ...req.query },
    { populate: "created_by, category_id" }
  );
  return res.json(data);
});

export const create = catchAsync(async (req: Request, res: Response) => {
  const data = await CategoryService.create({ ...req.body });
  return res.json(data);
});

export const deleteDocument = catchAsync(
  async (req: Request, res: Response) => {
    const data = await CategoryService.deleteDocument(req.params.id);
    return res.json(data);
  }
);

export const update = catchAsync(async (req: Request, res: Response) => {
  const data = await CategoryService.update(req.params.id, req.body);
  return res.json(data);
});

export const getSingle = catchAsync(async (req: Request, res: Response) => {
  const data = await CategoryService.getById(req.params.id);

  return res.json(data);
});
