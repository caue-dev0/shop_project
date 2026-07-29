import { Router } from "express";

import {
  getAllUsers,
  getUserById,
  postCreateUser,
  putUpdateUser,
  patchUpdateUser,
  deleteUser,
} from "../controller/users-controller.js";

import {
  getAllProducts,
  getProductById,
  postCreateProduct,
  putUpdateProduct,
  patchUpdateProduct,
  deleteProduct,
} from "../controller/products-controller.js";

import { postLogin, getProfile } from "../controller/login-controller.js";

const routes = Router();

// Routes users

routes.get("/users", getAllUsers);

routes.get("/users/:id", getUserById);

routes.post("/users", postCreateUser);

routes.put("/users/:id", putUpdateUser);

routes.patch("/users/:id", patchUpdateUser);

routes.delete("/users/:id", deleteUser);

// Routes login

routes.post("/login", postLogin);

routes.get("/profile", getProfile);

// Routes products

routes.get("/products", getAllProducts);

routes.get("/products/:id", getProductById);

routes.post("/products/:id", postCreateProduct);

routes.put("/products/:id", putUpdateProduct);

routes.patch("/products/:id", patchUpdateProduct);

routes.patch("/products/:id", deleteProduct);
export default routes;
