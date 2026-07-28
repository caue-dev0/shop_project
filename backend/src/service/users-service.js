import {
  allUsers,
  userByEmail,
  userById,
  createNewUser,
  updateUserFull,
  updateUserPartial,
  deleteUser,
} from "../repository/users-repository.js";

import {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
} from "../helpers/api-errors.js";

import bcrypt from "bcrypt";

export async function listAllUsers() {
  return await allUsers();
}

export async function findUserById(id) {
  return await userById(id);
}

export async function findUserByEmail(email) {
  return await userByEmail(email);
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

  return await createNewUser(userData);
}

export async function updateUser(id, data) {
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

  return await updateUserFull(id, data);
}

export async function updateParcialUser(id, data) {
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

  return await updateUserPartial(id, data);
}

export async function removeUser(id) {
  const user = await findUserById(id);

  if (!user) {
    throw new NotFoundError("Usuário não existe.");
  }

  await deleteUser(id);
}
