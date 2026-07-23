import {
  listAll,
  findById,
  create,
  update,
  remove,
} from "../service/clients-service.js";

import { userSchema, userSchemaId } from "../schemas/user-schema.js";

export async function getAll(req, res, next) {
  try {
    const users = await listAll();

    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}

export async function getById(req, res, next) {
  try {
    const id = userSchemaId.parse(req.params.id);

    const user = await findById(id);

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}

export async function postCreate(req, res, next) {
  try {
    const data = userSchema.parse(req.body);

    const newUser = await create(data);

    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
}

export async function putUpdate(req, res, next) {
  try {
    const id = userSchemaId.parse(req.params.id);
    const data = userSchema.parse(req.body);

    const updatedUser = await update(req.params.id, data);

    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
}

export async function deleteRemove(req, res, next) {
  try {
    const id = userSchemaId.parse(req.params.id);

    await remove(id);

    res.status(204).json({ message: "Usuário removido com sucesso." });
  } catch (err) {
    next(err);
  }
}
