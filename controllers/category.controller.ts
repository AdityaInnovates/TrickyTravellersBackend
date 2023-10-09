import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { Blog, Category as Model } from "../models";

import { StatusCodes } from "http-status-codes";
import { CategoryService } from "../services";

export const get = catchAsync(async (req: Request, res: Response) => {
  if (req.query.get === "all" && req.query.type === "blog") {
    const data = await Model.find({ type: req.query.type }).lean();
    console.log(data);
    const blogs = await Blog.find({ status: { $gte: 3 } });
    const result = data.map((obj: any) => {
      return {
        ...obj,
        number: blogs.filter(
          (item: any) => item.category_id.toString() === obj._id.toString()
        ).length,
      };
    });
    return res.json(result);
  }

  const data = await CategoryService.query(
    { ...req.query },
    {} // { populate: "created_by ,category_id" }
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
