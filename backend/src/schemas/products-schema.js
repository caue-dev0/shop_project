import { z } from "zod";

export const productsIdSchema = z.int();

export const productsSchema = z.object({
  name: z
    .string()
    .min(3, "Mínimo 3 caractéres")
    .max(80, "Máximo de 80 caracteres"),
  price: z.number().nonnegative(),
});

export const productsParcialSchema = z.object({
  name: z
    .string()
    .min(3, "Mínimo 3 caractéres")
    .max(80, "Máximo de 80 caracteres")
    .optional(),
  price: z.number().nonnegative().optional(),
});
