import { PlayerType } from "@/types";
import { Card, CardContent } from "../ui/card";
import { Crown } from "lucide-react";

type PlayerCardProps = {
  player: PlayerType;
  isHost?: boolean;
};

export default function PlayerCard({
  player,
  isHost = false,
}: PlayerCardProps) {
  return (
    <Card className="w-60 p-3 relative border-2 border-black hover:scale-105 transition-all">
      <CardContent className="w-full px-0">
        <div
          style={{ backgroundColor: player.color }}
          aria-label={`${player.name}'s color: ${player.color}`}
          className="w-full h-36 rounded-md"
        />
        <p className="text-xl font-bold line-clamp-2">{player.name}</p>
      </CardContent>
      {isHost && (
        <Crown className="size-10 absolute top-1 bg-white rounded-full p-1 border-2 border-black right-1 text-amber-600" />
      )}
    </Card>
  );
}
