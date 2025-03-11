import { z } from 'zod';
import { UserRoleEnum } from './user.dto';

export const FindAllUserSchema = z.object({
  sender_email: z.string().trim().email(),
});

export const CreateUserSchema = z.object({
  sender_email: z.string().trim().email(),
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
  password: z.string().trim().min(1),
  role: z.nativeEnum(UserRoleEnum),
});

export const FindOneUserSchema = z.object({
  sender_email: z.string().trim().email(),
  id: z.preprocess((val) => Number(val), z.number()),
});
