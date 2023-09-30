import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { CommentService } from "../services";

export const getComment = catchAsync(async (req: Request, res: Response) => {
  const comments = await CommentService.getById(req.params.id);
  res.json(comments);
});
