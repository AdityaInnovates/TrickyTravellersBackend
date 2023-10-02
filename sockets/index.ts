import { Server, Socket } from "socket.io";
import { Chat } from "../models";
import app from "../app";
import watch from "../utils/watcher";
import chatSockets from "./chat";
import notificationSocket from "./notification";

const socket = (server: Server, users: any) => {
  server.on("connection", (socket: Socket) => {
    socket.join(socket.id);
    socket.on("add user", (user) => {
      const index = users.findIndex((item: any) => item.user.id === user.id);

      if (index < 0) {
        users.push({ id: socket.id, user });
      } else {
        users[index] = { id: socket.id, user };
      }
    });

    chatSockets(socket, users);
    notificationSocket(socket, users);
    socket.on("disconnect", () => {
      console.log("disconnected", socket.id);

      users = users.filter((item: any) => item.id !== socket.id);
    });
    app.set("socket", socket);
    app.set("socket_users", users);
  });
};

export default socket;
