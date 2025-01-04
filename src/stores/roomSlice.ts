import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./storeConfig";
import { PlayerType, RoomType } from "@/types";
import { io, Socket } from "socket.io-client";
import { BASE_URL } from "@/configs";

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
    joinRoom: (
      state,
      action: PayloadAction<{ roomId: string; user: PlayerType }>
    ) => {
      const socket = io(BASE_URL, {
        query: {
          roomId: action.payload.roomId,
          user: action.payload.user,
        },
      });
      socket.connect();
      const returnObj = {
        ...state,
        socket,
      };
      socket.on("getMembersInRoom", (users) => {
        returnObj.members = users;
      });

      return returnObj;
    },
  },
});

export const { joinRoom } = roomSlice.actions;
export const room = (state: RootState): RoomState => state.room;
export default roomSlice.reducer;
