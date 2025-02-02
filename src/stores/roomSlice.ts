import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./storeConfig";
import { Chat, MembersIncludesType, PlayerType, RoomType } from "@/types";
import roomApi from "@/api/roomApi";
import { HostSchemaType } from "@/schema";

type RoomState = {
  roomData: null | RoomType;
  members: MembersIncludesType[];
  chats: Chat[];
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

const createRoom = createAsyncThunk(
  "room/createRoom",
  async (
    body: HostSchemaType & {
      hostData: PlayerType;
    }
  ) => {
    const res = await roomApi.createRoom(body);
    return res.data;
  }
);

const getInitialRoomState = (): RoomState => {
  return {
    roomData: null,
    members: [],
    chats: [],
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
    clearRooms: (state) => {
      state.roomData = null;
    },
    setChats: (state, action) => {
      state.chats = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(joinRoomByRoomId.fulfilled, (state, action) => {
      state.roomData = action.payload.data;
    });
    builder.addCase(createRoom.fulfilled, (state, action) => {
      state.roomData = action.payload.data;
    });
  },
});

export const { setMembers, clearRooms, setChats } = roomSlice.actions;
export { joinRoomByRoomId, createRoom };
export const room = (state: RootState): RoomState => state.room;
export default roomSlice.reducer;
