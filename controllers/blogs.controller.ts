import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";

import { BlogService, MailService } from "../services";

export const get = catchAsync(async (req: Request, res: Response) => {
  const data = await BlogService.query(
    req.query.slug ? { slug: req.query.slug } : { ...req.query },
    {
      ...req.query,
      populate: "created_by,category_id,approved_by",
      sortBy: "-updatedAt",
    }
  );
  return res.json(data);
});

export const create = catchAsync(async (req: Request, res: Response) => {
  const user: any = req.user;
  const data = await BlogService.create({
    ...req.body,
    files: req.files,
    created_by: user.id,
    updated_by: user.role,
  });

  return res.json(data);
});

export const deleteDocument = catchAsync(
  async (req: Request, res: Response) => {
    const data = await BlogService.deleteDocument(req.params.id);
    return res.json(data);
  }
);

export const update = catchAsync(async (req: Request, res: Response) => {
  const user: any = req.user;
  const data = await BlogService.update(req.params.id, {
    ...req.body,
    files: req.files,
    updated_by: user.role,
    ...(user.role === "user" ? { status: 0 } : {}),
  });
  if (user.role === "agent" && data.status !== 1) {
    const created_by: any = data.created_by;
    await MailService.sendBlogAgentUpdate(
      created_by.email,
      user.name,
      "/blogs/" + data.slug
    );
  }
  return res.json(data);
});

export const getSingle = catchAsync(async (req: Request, res: Response) => {
  const data = await BlogService.getById(req.params.id);

  return res.json(data);
});

export const agentUpdate = catchAsync(async (req: Request, res: Response) => {
  const user: any = req.user;
  const data = await BlogService.agentUpdate(req.params.id, {
    approved_by: user.id,
    ...req.body,
    updated_by: user.role,
  });
  if (req.body.status === 1) {
    const created_by: any = data.created_by;
    await MailService.sendBlogReject(
      created_by.email,
      user.name,
      req.body.reject_reason,
      data.title
    );
  }

  return res.json(data);
});

export const comment = catchAsync(async (req: Request, res: Response) => {
  const user: any = req.user;
  const data = await BlogService.comment(req.params.id, {
    ...req.body,
    user_id: user.id,
  });
  res.json(data);
});
