import { z, ZodSchema } from 'zod';

export const signUpSchema: ZodSchema = z.object({
  name: z.string(),
  lastName: z.string(),
  email: z.string(),
  password: z.string(),
});

export type SignUp = z.infer<typeof signUpSchema>;
