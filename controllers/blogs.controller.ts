import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";

import { BlogService, MailService, NotificationService } from "../services";
import ApiError from "../utils/ApiError";
import { PostContent } from "../models";

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
  const content = await PostContent.create({ content: req.body.content });
  const data = await BlogService.create({
    ...req.body,
    files: req.files,
    created_by: user.id,
    updated_by: user.role,
    content: content._id,
    slug:
      req.body?.title?.toLowerCase()?.split(" ").join("-") +
      "-" +
      user.username,
    ...(user.role === "agent" ? { status: 2 } : {}),
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
  const blog = await BlogService.getById(req.params.id);
  if (req.body.status) {
    if (blog.status !== 2) {
      throw new ApiError(403, "You cannot publish this blog");
    }
  }
  if (req.body.content) {
    const content: any = await PostContent.findById(blog.content);

    content.content = req.body.content;
    await content.save();
  }
  delete req.body.content;
  const data = await BlogService.update(req.params.id, {
    ...req.body,
    files: req.files,
    updated_by: user.role,
    ...(user.role === "user"
      ? { status: req.body.status ? req.body.status : 0 }
      : {}),
  });
  if (user.role === "agent" && data.status !== 1) {
    const created_by: any = data.created_by;
    await NotificationService.create(
      created_by.id,
      "Blog Update",
      "Your Blog has been updated by an agent please check your email for further information "
    );
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
  if (req.body.content) {
    const content: any = await PostContent.findById(data.content);
    content.content = req.body.content;
    await content.save();
  }
  if (req.body.status === 1) {
    const created_by: any = data.created_by;
    await MailService.sendBlogReject(
      created_by.email,
      user.name,
      req.body.reject_reason,
      data.title
    );
    await NotificationService.create(
      created_by.id,
      "Blog Update",
      "Your Blog has been rejected please check your email for further information "
    );
  }
  if (req.body.status === 2) {
    const created_by: any = data.created_by;
    await MailService.sendBlogAccept(
      created_by.email,
      user.name,
      "/blogs/" + data.slug
    );
    await NotificationService.create(
      created_by.id,
      "Blog Update",
      "Your Blog has been approved please check your email for further information "
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

export const like = catchAsync(async (req: Request, res: Response) => {
  const user: any = req.user;
  const data = await BlogService.like(req.params.id, user.id);
  res.json(data);
});
