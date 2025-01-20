import CopyButton from "@/components/common/copyButton";
import PlayerCard from "@/components/common/playerCard";
import { Button } from "@/components/ui/button";
import { initSocket } from "@/lib/socket";
import { player, RootState } from "@/stores";
import { clearRooms, room, setMembers } from "@/stores/roomSlice";
import { handleSuccess } from "@/utils";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Lobby() {
  const dispatch = useDispatch();
  const playerData = useSelector((state: RootState) => player(state));
  const { roomData, members } = useSelector((state: RootState) => room(state));

  useEffect(() => {
    if (!playerData || !roomData?.id) return;

    const socket = initSocket();
    socket.emit("join-room", {
      roomId: roomData?.id,
      ...playerData,
    });

    socket.on("room-members", (data) => {
      console.log("data", data);
      dispatch(setMembers(data));
    });

    socket.on("members-leave", (member) => {
      if (playerData.uniqueId !== member.id) {
        handleSuccess(`${member.name} has leave.`);
      }
    });

    return () => {
      socket.emit("leave-room", {
        roomId: roomData?.id,
        ...playerData,
      });
      socket.close();
      clearRooms();
    };
  }, [playerData, roomData?.id]);

  return (
    <main className="h-screen w-screen bg-gray-main p-5 flex flex-col lg:p-10">
      <div className="w-full grow">
        <div className="w-full flex justify-between">
          <h1 className="text-5xl font-bold text-white">
            {roomData?.roomName} ({members.length}/{roomData?.maxMember})
          </h1>
          <CopyButton
            textToCopy={roomData?.publicId || ""}
            label={roomData?.publicId || ""}
          />
        </div>
        <div className="grid grid-cols-6 mt-10 gap-10">
          {members.map((player) => (
            <PlayerCard
              key={player.id}
              player={player.User || {}}
              isHost={roomData?.host?.id === player?.User?.id}
            />
          ))}
        </div>
      </div>
      <section className="flex gap-3 justify-end">
        <Button asChild size="lg" variant="secondary">
          <Link to="/">Leave</Link>
        </Button>
        <Button size="lg">Start</Button>
      </section>
    </main>
  );
}
