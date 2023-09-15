import { Socket } from "socket.io";
import { Notification } from "../models";

const watch = async (socket: Socket, users: any) => {
  const stream = Notification.watch();

  stream.on("change", (next: any) => {
    console.log("change ", next.fullDocument);
    const user = users.find(
      (item: any) => item.user.id === next.fullDocument.user.toString()
    );
    if (user) {
      socket.to(user.id).emit("new notification", next.fullDocument);
    }
  });
};  

export default watch;
