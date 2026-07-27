import { Router } from "express";

import {
  getAllUsers,
  getUsersById,
  postCreateUsers,
  putUpdateUsers,
  deleteUsers,
} from "../controller/clients-controller.js";

import { postLogin, getProfile } from "../controller/login-controller.js";

const routes = Router();

// Routes users

routes.get("/users", getAllUsers);

routes.get("/users/:id", getUsersById);

routes.post("/users", postCreateUsers);

routes.put("/users/:id", putUpdateUsers);

routes.delete("/users/:id", deleteUsers);

// Routes login

routes.post("/login", postLogin);

routes.get("/profile", getProfile);

export default routes;
