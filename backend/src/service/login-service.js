import { BadRequestError, UnauthorizedError } from "../helpers/api-errors.js";

import { findByEmail, findById } from "./clients-service.js";

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

export async function login(data) {
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

export async function profile(authorization) {
  if (!authorization) {
    throw new UnauthorizedError("Não autorizado.");
  }

  const token = authorization.split(" ")[1];

  const { id } = jwt.verify(token, process.env.JWT_PASSWORD);

  const user = await findById(id);

  if (!user) {
    throw new UnauthorizedError("Não autorizado.");
  }

  return user;
}
