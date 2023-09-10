import { Socket } from "socket.io";
import { Notification } from "../models";
import watch from "../utils/watcher";

const notificationSocket = (socket: Socket, users: any) => {
  socket.on("get notifications", async (id) => {
    const notifications = await Notification.find({ user: id });
    socket.emit("notifications", notifications);
  });
  watch(socket, users);
};

export default notificationSocket;
