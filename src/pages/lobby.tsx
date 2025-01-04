import PlayerCard from "@/components/common/playerCard";
import { player, RootState } from "@/stores";
import { room } from "@/stores/roomSlice";
import { useSelector } from "react-redux";

export default function Lobby() {
  const playerData = useSelector((state: RootState) => player(state));
  const roomData = useSelector((state: RootState) => room(state));

  return (
    <div className="h-screen w-screen bg-gray-main p-5 lg:p-10">
      <div className="w-full">
        <h1 className="text-5xl font-bold text-white mb-10">Room name (7/8)</h1>
        <div className="grid grid-cols-6 gap-10">
          <PlayerCard
            player={{
              name: "name",
              color: "#222",
            }}
            isHost
          />
          <PlayerCard player={{ name: "test", color: "#222" }} />
          <PlayerCard player={{ name: "test", color: "#222" }} />
          <PlayerCard player={{ name: "test", color: "#222" }} />
          <PlayerCard player={{ name: "test", color: "#222" }} />
          <PlayerCard player={{ name: "test", color: "#222" }} />
          <PlayerCard player={{ name: "test", color: "#222" }} />
        </div>
      </div>
    </div>
  );
}
