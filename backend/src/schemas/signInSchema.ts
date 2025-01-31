import { z, ZodSchema } from 'zod';

export const signInSchema: ZodSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type SignIn = z.infer<typeof signInSchema>;
