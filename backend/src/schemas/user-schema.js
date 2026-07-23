import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(3, "Mínimo de 3 caracteres."),
  email: z.email(),
  password: z
    .string()
    .min(3, "Mínimo de 3 caracteres.")
    .max(24, "Máximo de 24 caracteres"),
});

export const userSchemaId = z.uuidv7("error");
