import { Router } from "express";

import {
  getAll,
  getById,
  postCreate,
  putUpdate,
  deleteRemove,
} from "../controller/clients-controller.js";

import { login } from "../controller/login-controller.js";

const routes = Router();

routes.get("/", getAll);
routes.get("/:id", getById);
routes.post("/", postCreate);
routes.put("/:id", putUpdate);
routes.delete("/:id", deleteRemove);

routes.post("/login", login);

export default routes;
