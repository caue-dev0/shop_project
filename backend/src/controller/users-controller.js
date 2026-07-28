import {
  listAllUsers,
  findUserById,
  createUser,
  updateUser,
  removeUser,
  updateParcialUser,
} from "../service/users-service.js";

import {
  clientsSchema,
  clientsIdSchema,
  clientsParcialSchema,
} from "../schemas/users-schema.js";

export async function getAllUsers(req, res, next) {
  try {
    const users = await listAllUsers();

    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}

export async function getUserById(req, res, next) {
  try {
    const id = clientsIdSchema.parse(req.params.id);

    const user = await findUserById(id);

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}

export async function postCreateUser(req, res, next) {
  try {
    const data = clientsSchema.parse(req.body);

    const user = await createUser(data);

    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}

export async function putUpdateUser(req, res, next) {
  try {
    const id = clientsIdSchema.parse(req.params.id);
    const data = clientsSchema.parse(req.body);

    const user = await updateUser(id, data);

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}

export async function patchUpdateUsers(req, res, next) {
  try {
    const id = clientsIdSchema.parse(req.params.id);
    const data = clientsParcialSchema.parse(req.body);

    const user = await updateParcialUser(id, data);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}

export async function deleteUsers(req, res, next) {
  try {
    const id = clientsIdSchema.parse(req.params.id);

    await removeUser(id);

    res.status(204).json({ message: "Usuário removido com sucesso." });
  } catch (err) {
    next(err);
  }
}
