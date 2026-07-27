import { BadRequestError, UnauthorizedError } from "../helpers/api-errors.js";

import { findClientsByEmail, findClientsById } from "./clients-service.js";

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

export async function login(data) {
  const { email, password } = data;

  const clients = await findClientsByEmail(email);

  if (!clients) {
    throw new BadRequestError("E-mail ou senha inválidos.");
  }

  const verifyPassword = await bcrypt.compare(password, clients.password);

  if (!verifyPassword) {
    throw new BadRequestError("E-mail ou senha inválidos.");
  }

  const token = jwt.sign({ id: clients.id }, process.env.JWT_SECRET, {
    expiresIn: "8h",
  });

  const { password: _, ...userLogin } = clients;

  return { user: userLogin, token: token };
}

export async function profile(authorization) {
  if (!authorization) {
    throw new UnauthorizedError("Não autorizado.");
  }

  const token = authorization.split(" ")[1];

  const { id } = jwt.verify(token, process.env.JWT_SECRET);

  const clients = await findClientsById(id);

  if (!clients) {
    throw new UnauthorizedError("Não autorizado.");
  }

  return clients;
}
