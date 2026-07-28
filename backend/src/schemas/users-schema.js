import { z } from "zod";

export const clientsIdSchema = z.uuidv7("error");
export const clientsSchema = z.object({
  name: z.string().min(3, "Mínimo de 3 caracteres."),
  email: z.email(),
  password: z
    .string()
    .min(3, "Mínimo de 3 caracteres.")
    .max(24, "Máximo de 24 caracteres"),
});

export const clientsParcialSchema = z.object({
  name: z.string().min(3, "Mínimo de 3 caracteres.").optional(),
  email: z.email().optional(),
  password: z
    .string()
    .min(3, "Mínimo de 3 caracteres.")
    .max(24, "Máximo de 24 caracteres")
    .optional(),
});
