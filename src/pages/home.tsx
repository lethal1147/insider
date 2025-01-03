import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import {
  RootState,
  changePlayerColor,
  changePlayerName,
  player,
} from "@/stores";

export default function Home() {
  const dispatch = useDispatch();
  const playerData = useSelector((state: RootState) => player(state));

  const handleChangeName = (val: string) => {
    dispatch(changePlayerName(val));
  };

  const handleChangeColor = (val: string) => {
    dispatch(changePlayerColor(val));
  };

  return (
    <main className="h-screen w-screen relative flex flex-col justify-center items-center bg-gray-main">
      <img
        className="animate-float"
        src="/insider-logo.png"
        alt="insider logo"
      />
      <div className="mt-20 flex flex-col gap-5">
        <Button
          className="min-w-40 text-3xl font-bold text-gray-main h-16"
          size="lg"
          asChild
        >
          <Link to="/host">Host</Link>
        </Button>
        <Button
          className="min-w-40 text-3xl font-bold text-gray-main h-16"
          size="lg"
          asChild
        >
          <Link to="/join">Join</Link>
        </Button>
      </div>

      <div className="absolute top-4 right-4 flex items-center space-x-2">
        <Popover>
          <PopoverTrigger asChild>
            <div className="flex flex-col gap-3 items-center">
              <button
                className="size-32 rounded-full border-2 border-white"
                style={{ backgroundColor: playerData.color }}
              />
              <p className="text-white font-bold text-center line-clamp-1">
                {playerData.name}
              </p>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <div className="flex flex-col space-y-2">
              <label htmlFor="player-color" className="text-sm font-medium">
                Choose your color
              </label>
              <Input
                id="player-color"
                type="color"
                value={playerData.color}
                onChange={(e) => handleChangeColor(e.target.value)}
                className="w-full rounded-xl h-10 cursor-pointer"
              />
              <Input
                id="player-name"
                type="text"
                value={playerData.name}
                onChange={(e) => handleChangeName(e.target.value)}
                className="w-full h-10 cursor-pointer"
              />
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </main>
  );
}
