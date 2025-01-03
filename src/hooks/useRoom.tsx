import { BASE_URL } from "@/configs";
import { useState } from "react";
import { io, Socket } from "socket.io-client";

export default function useRoom() {
  const [socket, setSocket] = useState<Socket | null>(null);
  // users in room
  const [users, setUsers] = useState([]);

  const connectSocket = (roomId: string) => {
    const socket = io(BASE_URL, {
      query: {
        roomId,
      },
    });
    socket.connect();
    setSocket(socket);

    socket.on("getMembersInRoom", (users) => {
      setUsers(users);
    });
  };
  const disconnectSocket = () => {};

  const onJoinRoom = async (roomId: string) => {
    try {
      connectSocket(roomId);
    } catch (err) {
      console.log(err);
    }
  };

  const onLeaveRoom = async () => {
    try {
      disconnectSocket();
    } catch (err) {
      console.log(err);
    }
  };

  return {
    socket,
    onJoinRoom,
    onLeaveRoom,
    users,
  };
}
