export type PlayerType = {
  name: string;
  color: string;
  uniqueId: string;
};

export type PlayerTypeWithId = {
  id: string;
} & PlayerType;

export interface MembersType {
  id: number;
  score: number;
  roomId: number;
  updatedAt: Date;
  createdAt: Date;
  userId: string;
}

export interface MembersIncludesType extends MembersType {
  User: PlayerTypeWithId;
}
