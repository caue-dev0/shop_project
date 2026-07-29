import { z } from "zod";

export const usersIdSchema = z.uuidv7("error");
export const usersSchema = z.object({
  name: z.string().min(3, "Mínimo de 3 caracteres."),
  email: z.email(),
  password: z
    .string()
    .min(3, "Mínimo de 3 caracteres.")
    .max(24, "Máximo de 24 caracteres"),
});

export const usersParcialSchema = z.object({
  name: z.string().min(3, "Mínimo de 3 caracteres.").optional(),
  email: z.email().optional(),
  password: z
    .string()
    .min(3, "Mínimo de 3 caracteres.")
    .max(24, "Máximo de 24 caracteres")
    .optional(),
});
