import {
  listAllClients,
  findClientsById,
  createClients,
  updateClients,
  removeClients,
} from "../service/clients-service.js";

import { clientsSchema, clientsSchemaId } from "../schemas/clients-schema.js";

export async function getAllClients(req, res, next) {
  try {
    const clients = await listAllClients();

    res.status(200).json(clients);
  } catch (err) {
    next(err);
  }
}

export async function getClientsById(req, res, next) {
  try {
    const id = clientsSchemaId.parse(req.params.id);

    const clients = await findClientsById(id);

    res.status(200).json(clients);
  } catch (err) {
    next(err);
  }
}

export async function postCreateClients(req, res, next) {
  try {
    const data = clientsSchema.parse(req.body);

    const newClients = await createClients(data);

    res.status(201).json(newClients);
  } catch (err) {
    next(err);
  }
}

export async function putUpdateClients(req, res, next) {
  try {
    const id = clientsSchemaId.parse(req.params.id);
    const data = clientsSchema.parse(req.body);

    const updatedClients = await updateClients(id, data);

    res.status(200).json(updatedClients);
  } catch (err) {
    next(err);
  }
}

export async function deleteClients(req, res, next) {
  try {
    const id = clientsSchemaId.parse(req.params.id);

    await removeClients(id);

    res.status(204).json({ message: "Usuário removido com sucesso." });
  } catch (err) {
    next(err);
  }
}
