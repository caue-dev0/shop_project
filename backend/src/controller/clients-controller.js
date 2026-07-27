import {
  listAllUsers,
  findUsersById,
  createUsers,
  updateUsers,
  removeUsers,
} from "../service/clients-service.js";

import { clientsSchema, clientsSchemaId } from "../schemas/users-schema.js";

export async function getAllUsers(req, res, next) {
  try {
    const users = await listAllUsers();

    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}

export async function getUsersById(req, res, next) {
  try {
    const id = clientsSchemaId.parse(req.params.id);

    const users = await findUsersById(id);

    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}

export async function postCreateUsers(req, res, next) {
  try {
    const data = clientsSchema.parse(req.body);

    const newUsers = await createUsers(data);

    res.status(201).json(newUsers);
  } catch (err) {
    next(err);
  }
}

export async function putUpdateUsers(req, res, next) {
  try {
    const id = clientsSchemaId.parse(req.params.id);
    const data = clientsSchema.parse(req.body);

    const updatedUsers = await updateUsers(id, data);

    res.status(200).json(updatedUsers);
  } catch (err) {
    next(err);
  }
}

export async function deleteUsers(req, res, next) {
  try {
    const id = clientsSchemaId.parse(req.params.id);

    await removeUsers(id);

    res.status(204).json({ message: "Usuário removido com sucesso." });
  } catch (err) {
    next(err);
  }
}
