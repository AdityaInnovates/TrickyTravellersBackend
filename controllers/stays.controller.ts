import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";

import { MailService, NotificationService, StaysService } from "../services";
import ApiError from "../utils/ApiError";

export const get = catchAsync(async (req: Request, res: Response) => {
  const data = await StaysService.query(
    req.query.search
      ? { $text: { $search: req.query.search } }
      : req.query.slug
      ? { slug: req.query.slug }
      : { ...req.query },
    { ...req.query, populate: "user_id,approved_by" }
  );
  return res.json(data);
});

export const create = catchAsync(async (req: Request, res: Response) => {
  const user: any = req.user;
  const data = await StaysService.create({
    ...req.body,
    user_id: user.id,
    updated_by: user.role,
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
    const data = await StaysService.deleteDocument(req.params.id);
    return res.json(data);
  }
);

export const update = catchAsync(async (req: Request, res: Response) => {
  const blog = await StaysService.getById(req.params.id);
  if (req.body.status) {
    if (blog.status !== 2) {
      throw new ApiError(403, "You cannot publish this stay");
    }
  }
  const user: any = req.user;
  const data = await StaysService.update(req.params.id, {
    ...req.body,
    user_id: user.id,
    updated_by: user.role,
    slug:
      req.body?.title?.toLowerCase()?.split(" ").join("-") +
      "-" +
      user.username,
    ...(user.role === "user"
      ? { status: req.body.status ? req.body.status : 0 }
      : {}),
  });
  if (user.role === "agent" && data.status !== 1) {
    const created_by: any = data.user_id;
    await NotificationService.create(
      created_by.id,
      "Stays Update",
      "Your Stay has been updated by an agent please check your email for further information "
    );
    await MailService.sendBlogAgentUpdate(
      created_by.email,
      user.name,
      "/stays/" + data.slug,
      "stay"
    );
  }
  return res.json(data);
});

export const getSingle = catchAsync(async (req: Request, res: Response) => {
  const data = await StaysService.getById(req.params.id);

  return res.json(data);
});

export const agentUpdate = catchAsync(async (req: Request, res: Response) => {
  const user: any = req.user;
  const data = await StaysService.agentUpdate(req.params.id, {
    approved_by: user.id,
    ...req.body,
    updated_by: user.role,
  });
  if (req.body.status === 1) {
    const created_by: any = data.user_id;
    await MailService.sendBlogReject(
      created_by.email,
      user.name,
      req.body.reject_reason,
      data.title,
      "stay"
    );
    await NotificationService.create(
      created_by.id,
      "Stay Update",
      "Your stay has been rejected please check your email for further information "
    );
  }
  if (req.body.status === 2) {
    const created_by: any = data.user_id;
    await MailService.sendBlogAccept(
      created_by.email,
      user.name,
      "/stays/" + data.slug,
      "stay"
    );
    await NotificationService.create(
      created_by.id,
      "Stay Update",
      "Your stay has been approved please check your email for further information "
    );
  }
  return res.json(data);
});

export const comment = catchAsync(async (req: Request, res: Response) => {
  const user: any = req.user;
  const data = await StaysService.comment(req.params.id, {
    ...req.body,
    user_id: user.id,
  });
  res.json(data);
});
