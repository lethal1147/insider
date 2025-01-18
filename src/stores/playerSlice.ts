import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./storeConfig";
import { PlayerType } from "@/types";
import { v4 as uuidv4 } from "uuid";

const getInitialPlayerState = (): PlayerType => {
  const storedPlayer = localStorage.getItem("player");
  if (storedPlayer) return JSON.parse(storedPlayer);

  const uuid = uuidv4();
  const newPlayer = { name: "Guest", color: "#fff", uniqueId: uuid };
  localStorage.setItem("player", JSON.stringify(newPlayer));
  return newPlayer;
};

const initialState: PlayerType = getInitialPlayerState();

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    changePlayerName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
      localStorage.setItem("player", JSON.stringify(state));
    },
    changePlayerColor: (state, action: PayloadAction<string>) => {
      state.color = action.payload;
      localStorage.setItem("player", JSON.stringify(state));
    },
  },
});

export const { changePlayerName, changePlayerColor } = playerSlice.actions;
export const player = (state: RootState): PlayerType => state.player;
export default playerSlice.reducer;
