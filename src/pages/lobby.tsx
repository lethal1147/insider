import PlayerCard from "@/components/common/playerCard";
import { Button } from "@/components/ui/button";
// import { player, RootState } from "@/stores";
// import { room } from "@/stores/roomSlice";
// import { useSelector } from "react-redux";
import { MOCK_PLAYERS } from "@/data";
import { PlayerType } from "@/types";
import { Link } from "react-router-dom";

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
    <main className="h-screen w-screen bg-gray-main p-5 flex flex-col lg:p-10">
      <div className="w-full grow">
        <h1 className="text-5xl font-bold text-white">
          Room name ({MOCK_PLAYERS.length}/{MOCK_MAX_MEMBER})
        </h1>
        <div className="grid grid-cols-6 mt-10 gap-10">
          {MOCK_PLAYERS.map((player) => (
            <PlayerCard
              key={player.uniqueId}
              player={player}
              isHost={MOCK_CURRENT_PLAYER.uniqueId === player.uniqueId}
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
