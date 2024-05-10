import { z } from "zod"
export const formSchema = z.object({
    todo: z.string().min(2).max(50),
  });