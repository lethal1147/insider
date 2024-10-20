import z from "zod";

export const hostSchema = z.object({
    password: z.string().optional(),
    vetoTime: z.number(),
    
})