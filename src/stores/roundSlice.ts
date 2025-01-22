import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./storeConfig";
import { PlayerTypeWithId } from "@/types";

type RoundState = {
  insider: null | PlayerTypeWithId;
  host: null | PlayerTypeWithId;
  secretWord: string;
  roundId: null | number;
};

const getInitialRoundState = (): RoundState => ({
  insider: null,
  host: null,
  secretWord: "",
  roundId: null,
});

const initialState = getInitialRoundState();

export const roundSlice = createSlice({
  name: "round",
  initialState,
  reducers: {
    setter: <T extends PlayerTypeWithId & string & number>(
      state: Draft<RoundState>,
      action: PayloadAction<{ name: keyof RoundState; value: T }>
    ) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
  },
});

export const { setter } = roundSlice.actions;
export const round = (state: RootState): RoundState => state.round;
export default roundSlice.reducer;
