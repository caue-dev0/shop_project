import {
  findAll,
  findById,
  create,
  updateFull,
  updateParcial,
  remove,
} from "../repository/products-repository.js";

import { NotFoundError } from "../helpers/api-errors.js";

import { findUserById } from "./users-service.js";
export async function listAllProducts() {
  return await findAll();
}

export async function findProductById(id) {
  return await findById(id);
}

export async function createProduct(id, data) {
  const user = await findUserById(id);

  if (!user) {
    throw new NotFoundError("Usuário não encontrado ou não existe..");
  }

  return await create(id, data);
}

export async function updateProductFull(id, data) {
  const user = await findUserById(id);

  if (!user) {
    throw new NotFoundError("Usuário não encontrado ou não existe.");
  }

  return await updateFull(id, data);
}

export async function updateProductParcial(id, data) {
  const user = await findUserById(id);

  if (!user) {
    throw new NotFoundError("Usuário não encontrado ou não existe.");
  }

  return await updateParcial(id, data);
}

export async function removeProduct(id) {
  const user = await findUserById(id);

  if (!user) {
    throw new NotFoundError("Usuário não encontrado ou não existe.");
  }

  return await remove(id);
}
