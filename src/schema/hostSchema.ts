import z from "zod";

export const hostSchema = z.object({
  roomName: z.string(),
  password: z.string().optional(),
  totalRound: z.number(),
  maxMember: z.number(),
  guessTime: z.number(),
  voteTime: z.number(),
});

export type HostSchemaType = z.infer<typeof hostSchema>;
