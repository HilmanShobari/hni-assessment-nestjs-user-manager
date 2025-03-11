import { z } from 'zod';

export const JwtSchema = z.object({
  authorization: z
    .string()
    .trim()
    .min(1)
    .refine((val) => {
      const [type, token] = val.split(' ');
      return type === 'Bearer' && token;
    })
    .transform((val) => val.split(' ').at(1)!),
});

export const LoginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().trim().min(1),
});
