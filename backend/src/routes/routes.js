import { Router } from "express";

import {
  getAll,
  getById,
  postCreate,
  putUpdate,
  deleteRemove,
} from "../controller/clients-controller.js";

import { postLogin, getProfile } from "../controller/login-controller.js";

const routes = Router();

// Routes users

routes.get("/user", getAll);

routes.get("/user/:id", getById);

routes.post("/user", postCreate);

routes.put("/user/:id", putUpdate);

routes.delete("/user/:id", deleteRemove);

// Routes login

routes.post("/login", postLogin);

routes.get("/profile", getProfile);

export default routes;
