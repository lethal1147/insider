import { PlayerTypeWithId } from "./playerTypes";

export type RoundStatus = "psw" | "i" | "v" | "f";

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

export type RoundType = {
  id: number;
  roundNumber: number;
  hostId: string;
  insiderId: string;
  secretWord?: string;
  status: RoundStatus;
  createdAt: Date;
  updatedAt: Date;
  room: RoomType;
};
