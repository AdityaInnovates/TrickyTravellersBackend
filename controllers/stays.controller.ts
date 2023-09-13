import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";

import { MailService, NotificationService, StaysService } from "../services";

export const get = catchAsync(async (req: Request, res: Response) => {
  const data = await StaysService.query(
    req.query.slug ? { slug: req.query.slug, ...req.query } : {},
    { ...req.query, populate: "user_id,approved_by" }
  );
  return res.json(data);
});

export const create = catchAsync(async (req: Request, res: Response) => {
  const user: any = req.user;
  const data = await StaysService.create({
    ...req.body,
    files: req.files,
    user_id: user.id,
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
  const user: any = req.user;
  const data = await StaysService.update(req.params.id, {
    ...req.body,
    files: req.files,
    updated_by: user.role,
    ...(user.role === "user" ? { status: 0 } : {}),
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
