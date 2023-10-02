import { Socket } from "socket.io";
import { Chat } from "../models";

const chatSockets = (socket: Socket, users: any) => {
  socket.on("new message", async (data: any) => {
    const chat: any = await Chat.findById(data.id).populate([
      { path: "users" },
      { path: "messages.sender" },
    ]);
    console.log(data);
    console.log(users);
    const receiver = users.find((item: any) => {
      return item.user.id === data.receiver;
    });
    console.log(receiver, "receiver");

    chat.messages.push({ sender: data.sender, message: data.message });
    await chat.save();
    const newChat = await Chat.findById(data.id).populate([
      { path: "users" },
      { path: "messages.sender" },
    ]);
    socket.emit("message", newChat);
    if (receiver) {
      socket.to(receiver.id).emit("message", newChat);
    }
  });

  socket.on("get messages", async (id) => {
    const chat = await Chat.findById(id).populate([
      { path: "users" },
      { path: "messages.sender" },
    ]);

    socket.emit("messages", chat);
  });
  socket.on("get chats", async (id) => {
    const chats = await Chat.find({
      users: { $in: id },
    })
      .populate([{ path: "users" }, { path: "messages.sender" }])
      .sort({ updatedAt: -1 });
    socket.emit("chats", chats);
  });

  socket.on("new chat", async ({ sender, receiver }) => {
    var chat = await Chat.findOne({
      $and: [{ users: { $in: [sender] } }, { users: { $in: [receiver] } }],
    });
    const socket_receiver = users.find(
      (item: any) => item.user.id === receiver
    );
    let isNewChat = false;
    if (!chat) {
      isNewChat = true;
      chat = await Chat.create({ users: [sender, receiver] });
    }
    const chats = await Chat.findById(chat._id).populate([
      { path: "users" },
      { path: "messages.sender" },
    ]);
    const senderchats = await Chat.find({
      users: { $in: sender },
    }).populate([{ path: "users" }, { path: "messages.sender" }]);
    socket.emit("newchat", { isNewChat, chats, allchats: senderchats });
    const receiverchats = await Chat.find({
      users: { $in: receiver },
    }).populate([{ path: "users" }, { path: "messages.sender" }]);
    socket_receiver &&
      socket
        .to(socket_receiver.id)
        .emit("newchat", { allchats: receiverchats, isNewChat, chats });
  });
};

export default chatSockets;
