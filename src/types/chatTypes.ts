import { PlayerTypeWithId } from "./playerTypes";

export interface Chat {
  id: number;
  content: string;
  roomId: number;
  userId: string;
  user: PlayerTypeWithId;
  createdAt: Date;
}
