import { Button } from "@/components/ui/button";
import { useRoom } from "@/hooks";

export default function Join() {
  const { onJoinRoom } = useRoom();

  return (
    <main className="h-screen w-screen bg-gray-main">
      <Button type="button" onClick={() => onJoinRoom("test")}>
        Join
      </Button>
    </main>
  );
}
