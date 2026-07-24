import { email, z } from "zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(3, "Mínimo de 3 caracteres.")
    .max(24, "Máximo de 24 caracteres"),
});
