import {
  listAll,
  findById,
  create,
  update,
  remove,
} from "../service/clients-service.js";

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
    const user = await findById(req.params.id);

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}

export async function postCreate(req, res, next) {
  try {
    const newUser = await create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
}

export async function putUpdate(req, res, next) {
  try {
    const updatedUser = await update(req.params.id, req.body);

    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
}

export async function deleteRemove(req, res, next) {
  try {
    await remove(req.params.id);

    res.status(204).json({ message: "Usuário removido com sucesso." });
  } catch (err) {
    next(err);
  }
}
