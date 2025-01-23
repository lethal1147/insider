import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./storeConfig";
import { PlayerTypeWithId } from "@/types";

type RoundState = {
  insider: null | PlayerTypeWithId;
  host: null | PlayerTypeWithId;
  secretWord: null | string;
  roundId: null | number;
};

const getInitialRoundState = (): RoundState => ({
  insider: null,
  host: null,
  secretWord: null,
  roundId: null,
});

const initialState = getInitialRoundState();

export const roundSlice = createSlice({
  name: "round",
  initialState,
  reducers: {
    setter: (
      state: Draft<RoundState>,
      action: PayloadAction<{
        name: keyof RoundState;
        value: RoundState[keyof RoundState];
      }>
    ) => {
      (state[action.payload.name] as RoundState[keyof RoundState]) =
        action.payload.value;
    },
  },
});

export const { setter } = roundSlice.actions;
export const round = (state: RootState): RoundState => state.round;
export default roundSlice.reducer;
