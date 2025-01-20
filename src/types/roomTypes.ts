import { PlayerTypeWithId } from "./playerTypes";

export type RoomType = {
  id: number;
  roomName: string;
  publicId: string;
  password: string;
  totalRound: number;
  maxMember: number;
  guessTime: number;
  voteTime: number;
  createdAt: string;
  host: PlayerTypeWithId;
};
