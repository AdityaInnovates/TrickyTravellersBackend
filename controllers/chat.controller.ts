import { Chat } from "../models";
import catchAsync from "../utils/catchAsync";
import { Request, Response } from "express";
export const getOrCreate = catchAsync(async (req: Request, res: Response) => {
  const user: any = req.user;
  const chat = await Chat.findOne({
    users: { $in: [user.id, req.params.id] },
  });

  if (chat) return res.json(chat.id);
  const newChat = await Chat.create({
    users: [req.params.id, user.id],
    messages: [],
  });

  return res.json(newChat._id);
});
