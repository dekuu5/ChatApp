import * as z from 'zod';


export const authValidator = z.object({
  username: z.string().min(3).max(255),
  email: z.string().email().max(255).optional(),
  password: z.string().min(8).max(255),
  firstname: z.string().min(3).max(255).optional(),
  lastname: z.string().min(3).max(255).optional(),
});

export type AuthValidatorType = z.infer<typeof authValidator>;



export const UserDataValidator = z.object({
  id: z.number(),
  createdAt: z.date(),
  email: z.string().email().max(255).optional(),
  username: z.string().min(3).max(255).optional(),
  name: z.string().min(3).max(255),
  profileImage: z.string().url().optional(),
  private: z.boolean(),
});


export type UserData = z.infer<typeof UserDataValidator>;