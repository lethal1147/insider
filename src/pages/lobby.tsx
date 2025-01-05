import PlayerCard from "@/components/common/playerCard";
// import { player, RootState } from "@/stores";
// import { room } from "@/stores/roomSlice";
// import { useSelector } from "react-redux";
import { MOCK_PLAYERS } from "@/data";
import { PlayerType } from "@/types";

const MOCK_CURRENT_PLAYER: PlayerType = {
  name: "BlazeFalcon",
  color: "#FF5733",
  uniqueId: "a7c3d1e2-9b2d-4f6f-8732-9f8c1a5b9a3e",
};

const MOCK_MAX_MEMBER = 8;

export default function Lobby() {
  // const playerData = useSelector((state: RootState) => player(state));
  // const roomData = useSelector((state: RootState) => room(state));

  return (
    <div className="h-screen w-screen bg-gray-main p-5 lg:p-10">
      <div className="w-full">
        <h1 className="text-5xl font-bold text-white mb-10">
          Room name ({MOCK_PLAYERS.length}/{MOCK_MAX_MEMBER})
        </h1>
        <div className="grid grid-cols-6 gap-10">
          {MOCK_PLAYERS.map((player) => (
            <PlayerCard
              key={player.uniqueId}
              player={player}
              isHost={MOCK_CURRENT_PLAYER.uniqueId === player.uniqueId}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
