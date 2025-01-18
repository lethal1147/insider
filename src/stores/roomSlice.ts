import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./storeConfig";
import { PlayerType, RoomType } from "@/types";
import { Socket } from "socket.io-client";
import { withAsync } from "@/utils";
import roomApi from "@/api/roomApi";

type RoomState = {
  socket: null | Socket;
  roomData: null | RoomType;
  members: PlayerType[];
};

const getInitialRoomState = (): RoomState => {
  return {
    socket: null,
    roomData: null,
    members: [],
  };
};

const initialState = getInitialRoomState();

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    joinRoom: async (
      state,
      action: PayloadAction<{
        roomId: string;
        user: PlayerType;
        password?: string;
      }>
    ) => {
      const { roomId, user, password } = action.payload;
      const res = await withAsync(() =>
        roomApi.joinRoom(roomId, {
          userId: user.uniqueId,
          name: user.name,
          color: user.color,
          password,
        })
      );
      console.log(res);
    },
  },
});

export const { joinRoom } = roomSlice.actions;
export const room = (state: RootState): RoomState => state.room;
export default roomSlice.reducer;
