import {
  findAllUsers,
  findUserById,
  createUser,
  updateUserFull,
  updateUserParcial,
  removeUser,
} from "../service/users-service.js";

import {
  usersSchema,
  usersIdSchema,
  usersParcialSchema,
} from "../schemas/users-schema.js";

export async function getAllUsers(req, res, next) {
  try {
    const users = await findAllUsers();

    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}

export async function getUserById(req, res, next) {
  try {
    const id = usersIdSchema.parse(req.params.id);

    const user = await findUserById(id);

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}

export async function postCreateUser(req, res, next) {
  try {
    const data = usersSchema.parse(req.body);

    const user = await createUser(data);

    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}

export async function putUpdateUser(req, res, next) {
  try {
    const id = usersIdSchema.parse(req.params.id);
    const data = usersSchema.parse(req.body);

    const user = await updateUserFull(id, data);

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}

export async function patchUpdateUser(req, res, next) {
  try {
    const id = usersIdSchema.parse(req.params.id);
    const data = usersParcialSchema.parse(req.body);

    const user = await updateUserParcial(id, data);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}

export async function deleteUser(req, res, next) {
  try {
    const id = usersIdSchema.parse(req.params.id);

    await removeUser(id);

    res.status(204).json({ message: "Usuário removido com sucesso." });
  } catch (err) {
    next(err);
  }
}
