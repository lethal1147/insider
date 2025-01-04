import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./playerSlice";
import roomReducer from "./roomSlice";

const store = configureStore({
  reducer: {
    player: playerReducer,
    room: roomReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
