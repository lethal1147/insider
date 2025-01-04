import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Join() {
  return (
    <main className="h-screen w-screen bg-gray-main">
      <Button asChild>
        <Link to="/lobby">Join</Link>
      </Button>
    </main>
  );
}
