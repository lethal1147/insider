import { Send } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { getSocket } from "@/lib/socket";
import { useDispatch, useSelector } from "react-redux";
import { room, setChats } from "@/stores/roomSlice";
import { player, RootState } from "@/stores";
import { useEffect, useState } from "react";
import { formatDate } from "@/utils";

export default function ChatBox() {
  const dispatch = useDispatch();
  const { roomData, chats } = useSelector((state: RootState) => room(state));
  const playerData = useSelector((state: RootState) => player(state));
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!playerData || !roomData?.id) return;
    const socket = getSocket();
    if (!socket) return;
    socket.on("get-messages", (data) => {
      console.log(data);
      dispatch(setChats(data));
    });
    console.log(socket);
    return () => {
      socket.close();
    };
  }, [playerData, roomData?.id]);

  const onSendMessage = () => {
    if (!roomData?.id) return;
    const socket = getSocket();
    if (!socket) return;

    socket.emit("send-message", {
      roomId: roomData.id,
      userId: playerData.uniqueId,
      message,
    });
    setMessage("");
  };

  return (
    <div className="max-w-[500px] w-full bg-white rounded-2xl p-3">
      <ScrollArea className="min-h-48">
        <ul className="space-y-3 ">
          {chats?.map((chat) => (
            <li className="border-b flex justify-between" key={chat.id}>
              <p className="line-clamp-1">{chat.content}</p>
              <div className="flex flex-col gap-1 items-end text-xs">
                <p className="font-bold">{chat.user?.name}</p>
                <p className="text-gray-400">{formatDate(chat.createdAt)}</p>
              </div>
            </li>
          ))}
        </ul>
      </ScrollArea>
      <Separator className="my-3" />
      <div className="w-full flex gap-3">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full"
          placeholder="Type something..."
        />
        <Button onClick={onSendMessage} type="button">
          <Send />
        </Button>
      </div>
    </div>
  );
}
