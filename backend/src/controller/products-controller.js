import {
  listAllProducts,
  findProductById,
  createProduct,
  updateProductFull,
  updateProductParcial,
  removeProduct,
} from "../service/products-service.js";

import {
  productsIdSchema,
  productsParcialSchema,
  productsSchema,
} from "../schemas/products-schema.js";
import { usersIdSchema } from "../schemas/users-schema.js";

export async function getAllProducts(req, res, next) {
  try {
    const products = await listAllProducts();

    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
}

export async function getProductById(req, res, next) {
  try {
    const id = productsIdSchema.parse(req.params.id);

    const product = await findProductById(id);

    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
}

export async function postCreateProduct(req, res, next) {
  try {
    const id = usersIdSchema.parse(req.params.id);

    const data = productsSchema.parse(req.body);

    const product = await createProduct(id, data);

    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
}

export async function putUpdateProduct(req, res, next) {
  try {
    const id = usersIdSchema.parse(req.params.id);

    const data = productsSchema.parse(req.body);

    const product = await updateProductFull(id, data);
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
}
export async function patchUpdateProduct(req, res, next) {
  try {
    const id = usersIdSchema.parse(req.params.id);

    const data = productsParcialSchema.parse(req.body);

    const product = await updateProductParcial(id, data);

    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
}
export async function deleteProduct(req, res, next) {
  try {
    const id = usersIdSchema.parse(req.params.id);

    removeProduct(id);

    res.status(204).json({ message: "Produto removido com sucesso." });
  } catch (err) {
    next(err);
  }
}
