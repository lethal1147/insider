import z from "zod";

export const joinSchema = z.object({
  roomId: z.string(),
  password: z.string().optional(),
});

export type JoinSchemaType = z.infer<typeof joinSchema>;
