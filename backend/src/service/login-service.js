import { pool } from "../database/pool.js";

import { BadRequestError } from "../helpers/api-errors.js";

import { findByEmail } from "./clients-service.js";

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

export async function createLogin(data) {
  const { email, password } = data;

  const user = await findByEmail(email);

  if (!user) {
    throw new BadRequestError("E-mail ou senha inválidos.");
  }

  const verifyPassword = await bcrypt.compare(password, user.password);

  if (!verifyPassword) {
    throw new BadRequestError("E-mail ou senha inválidos.");
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_PASSWORD, {
    expiresIn: "8h",
  });

  const { password: _, ...userLogin } = user;

  return { user: userLogin, token: token };
}
