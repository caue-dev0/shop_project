import {
  listAll,
  findById,
  create,
  update,
  remove,
} from "../service/clients-service.js";

export async function getAll(req, res) {
  try {
    const users = await listAll();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Houve algum erro interno." });
  }
}

export async function getById(req, res) {
  try {
    const user = await findById(req.params.id);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Houve algum erro interno." });
  }
}

export async function postCreate(req, res) {
  try {
    const newUser = await create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Houve algum erro interno." });
  }
}

export async function putUpdate(req, res) {
  try {
    const updatedUser = await update(req.params.id, req.body);

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Houve algum erro interno." });
  }
}

export async function deleteRemove(req, res) {
  try {
    await remove(req.params.id);

    res.status(204).json({ message: "Usuário removido com sucesso." });
  } catch (error) {
    res.status(500).json({ message: "Houve algum erro interno." });
  }
}
