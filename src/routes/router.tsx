import { Route, Routes } from "react-router-dom";
import Home from "@/pages/home";
import { Host, Join, Lobby } from "@/pages";

export default function Router() {
  return (
    <Routes>
      <Route path="*" element={<Home />} />
      <Route path="/host" element={<Host />} />
      <Route path="/join" element={<Join />} />
      <Route path="/lobby" element={<Lobby />} />
    </Routes>
  );
}
