import {
  findAll,
  findByEmail,
  findById,
  create,
  updateFull,
  updateParcial,
  remove,
} from "../repository/users-repository.js";

import { NotFoundError, ConflictError } from "../helpers/api-errors.js";

import bcrypt from "bcrypt";

export async function findAllUsers() {
  return await findAll();
}

export async function findUserById(id) {
  return await findById(id);
}

export async function findUserByEmail(email) {
  return await findByEmail(email);
}

export async function createUser(data) {
  const email = data.email.toLowerCase();

  const emailExists = await findUserByEmail(email);

  if (emailExists) {
    throw new ConflictError("E-mail já existe.");
  }

  const password = await bcrypt.hash(data.password, 10);

  const userData = {
    ...data,
    email,
    password,
  };

  return await create(userData);
}

export async function updateUserFull(id, data) {
  const user = await findUserById(id);

  if (!user) {
    throw new NotFoundError("Usuário não existe");
  }

  const emailExists = await findUserByEmail(data.email);

  if (emailExists && emailExists.id !== user.id) {
    throw new ConflictError("email já existe");
  }

  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }

  return await updateFull(id, data);
}

export async function updateUserParcial(id, data) {
  const user = await findUserById(id);

  if (!user) {
    throw new NotFoundError("Usuário não existe");
  }

  if (data.email) {
    const emailExists = await findUserByEmail(data.email);

    if (emailExists && emailExists.id !== user.id) {
      throw new ConflictError("email já existe");
    }
  }

  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }

  return await updateParcial(id, data);
}

export async function removeUser(id) {
  const user = await findUserById(id);

  if (!user) {
    throw new NotFoundError("Usuário não existe.");
  }

  await remove(id);
}
