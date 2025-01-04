import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./storeConfig";
import { PlayerType } from "@/types";

const getInitialPlayerState = (): PlayerType => {
  const storedPlayer = localStorage.getItem("player");
  if (storedPlayer) {
    return JSON.parse(storedPlayer);
  } else {
    localStorage.setItem(
      "player",
      JSON.stringify({ name: "Guest", color: "#fff" })
    );
    return { name: "Guest", color: "#fff" };
  }
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
