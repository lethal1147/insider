import CopyButton from "@/components/common/copyButton";
import PlayerCard from "@/components/common/playerCard";
import SecretWordDialog from "@/components/form/secretWordDialog";
import { Button } from "@/components/ui/button";
import { useSecretWordModal } from "@/hooks";
import { initSocket } from "@/lib/socket";
import { player, RootState, round, setter } from "@/stores";
import { clearRooms, room, setMembers } from "@/stores/roomSlice";
import { PlayerTypeWithId, RoundType } from "@/types";
import { handleSuccess } from "@/utils";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Lobby() {
  const dispatch = useDispatch();
  const playerData = useSelector((state: RootState) => player(state));
  const { roomData, members } = useSelector((state: RootState) => room(state));
  const { host, insider, secretWord } = useSelector((state: RootState) =>
    round(state)
  );
  const { isOpen, openModal, closeModal, confirmSecretWord } =
    useSecretWordModal();
  console.log("host", host);
  console.log("insider", insider);
  console.log("secretWord", secretWord);

  useEffect(() => {
    const socket = initSocket();
    if (!playerData || !roomData?.id) return;

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
        console.log(data.insider);
        console.log(data.host);
        console.log(data.round);
        setter({ name: "insider", value: data.insider });
        setter({ name: "host", value: data.host });
        setter({ name: "roundId", value: data.round.id });
        if (playerData.uniqueId === data.host.userId) {
          const secretWord = await openModal();
          console.log(secretWord);
        }
      }
    );

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
    const socket = initSocket();
    if (!roomData?.id) return;
    socket.emit("start-round", { roomId: roomData.id });
  };

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
        {roomData?.host?.id === playerData?.uniqueId && (
          <Button type="button" onClick={onStartRound} size="lg">
            Start
          </Button>
        )}
      </section>

      <SecretWordDialog
        isOpen={isOpen}
        onClose={closeModal}
        onConfirm={confirmSecretWord}
      />
    </main>
  );
}
