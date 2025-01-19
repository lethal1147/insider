import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./storeConfig";
import { MembersIncludesType, RoomType } from "@/types";
import roomApi from "@/api/roomApi";

type RoomState = {
  roomData: null | RoomType;
  members: MembersIncludesType[];
};

const joinRoomByRoomId = createAsyncThunk(
  "room/joinRoom",
  async (body: {
    roomId: string;
    body: {
      userId: string;
      password?: string;
      name: string;
      color: string;
    };
  }) => {
    const res = await roomApi.joinRoom(body.roomId, body.body);
    return res.data;
  }
);

const getInitialRoomState = (): RoomState => {
  return {
    roomData: null,
    members: [],
  };
};

const initialState = getInitialRoomState();

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setMembers: (state, action) => {
      state.members = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(joinRoomByRoomId.fulfilled, (state, action) => {
      state.roomData = action.payload.data;
    });
  },
});

export const { setMembers } = roomSlice.actions;
export { joinRoomByRoomId };
export const room = (state: RootState): RoomState => state.room;
export default roomSlice.reducer;
