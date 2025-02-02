import ChatBox from "@/components/common/chatBox";
import CopyButton from "@/components/common/copyButton";
import PlayerCard from "@/components/common/playerCard";
import SecretWordDialog from "@/components/form/secretWordDialog";
import { Button } from "@/components/ui/button";
import { useSecretWordModal } from "@/hooks";
import { getSocket, initSocket } from "@/lib/socket";
import { player, RootState, setter } from "@/stores";
import { clearRooms, room, setMembers } from "@/stores/roomSlice";
import { PlayerTypeWithId, RoundType } from "@/types";
import { handleSuccess } from "@/utils";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Lobby() {
  const dispatch = useDispatch();
  const playerData = useSelector((state: RootState) => player(state));
  const { roomData, members } = useSelector((state: RootState) => room(state));

  const { isOpen, openModal, closeModal, confirmSecretWord } =
    useSecretWordModal();
  const [currentTime, setCurrentTime] = useState<number | null>(null);

  useEffect(() => {
    if (!playerData || !roomData?.id) return;
    const socket = initSocket();

    socket.emit("join-room", {
      roomId: roomData?.id,
      ...playerData,
    });

    socket.on("room-members", (data) => {
      dispatch(setMembers(data));
    });

    socket.on("members-leave", (member) => {
      if (playerData.uniqueId !== member.id) {
        handleSuccess(`${member.name} has leave.`);
      }
    });

    socket.on(
      "set-role",
      async (data: {
        insider: PlayerTypeWithId;
        host: PlayerTypeWithId;
        round: RoundType;
      }) => {
        setter({ name: "insider", value: data.insider });
        setter({ name: "host", value: data.host });
        setter({ name: "roundId", value: data.round.id });
        if (playerData.uniqueId === data.round.hostId) {
          const secretWord = await openModal();

          socket.emit("set-secret-word", {
            roomId: roomData?.id,
            roundId: data.round.id,
            secretWord,
          });
        }
      }
    );

    socket.on("countdown", (data) => {
      setCurrentTime(Math.ceil(data / 1000));
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

  const onStartRound = () => {
    if (!roomData?.id) return;
    const socket = getSocket();
    if (!socket) return;
    socket.emit("start-round", { roomId: roomData.id });
  };

  return (
    <main className="h-screen w-screen bg-gray-main p-5 flex flex-col lg:p-10">
      <div className="w-full grow">
        <div className="w-full flex justify-between">
          <h1 className="text-5xl font-bold text-white">
            {roomData?.roomName} ({members.length}/{roomData?.maxMember})
          </h1>
          {currentTime && <div>Time left: {currentTime}</div>}
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
      <section className="flex gap-3 items-end justify-between">
        <ChatBox />
        <div className="flex gap-3">
          <Button asChild size="lg" variant="secondary">
            <Link to="/">Leave</Link>
          </Button>
          {roomData?.host?.id === playerData?.uniqueId && (
            <Button type="button" onClick={onStartRound} size="lg">
              Start
            </Button>
          )}
        </div>
      </section>

      <SecretWordDialog
        isOpen={isOpen}
        onClose={closeModal}
        onConfirm={confirmSecretWord}
      />
    </main>
  );
}
