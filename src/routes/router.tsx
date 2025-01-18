import { Route, Routes } from "react-router-dom";
import Home from "@/pages/home";
import { Lobby } from "@/pages";

export default function Router() {
  return (
    <Routes>
      <Route path="*" element={<Home />} />
      <Route path="/lobby/:publicId" element={<Lobby />} />
    </Routes>
  );
}
