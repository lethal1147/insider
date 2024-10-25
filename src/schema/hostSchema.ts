import z from "zod";

export const hostSchema = z.object({
  password: z.string().optional(),
  vetoTime: z.number(),
  guessTime: z.number(),
  round: z.number(),
});

export type HostSchemaType = z.infer<typeof hostSchema>;
