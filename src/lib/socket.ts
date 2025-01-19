import { BASE_URL } from "@/configs";
import { io, Socket } from "socket.io-client";

let socket: Socket;

export const initSocket = () => {
  socket = io(BASE_URL);

  return socket;
};
