import { Router } from "express";

import {
  getAllClients,
  getClientsById,
  postCreateClients,
  putUpdateClients,
  deleteClients,
} from "../controller/clients-controller.js";

import { postLogin, getProfile } from "../controller/login-controller.js";

const routes = Router();

// Routes users

routes.get("/clients", getAllClients);

routes.get("/clients/:id", getClientsById);

routes.post("/clients", postCreateClients);

routes.put("/clients/:id", putUpdateClients);

routes.delete("/clients/:id", deleteClients);

// Routes login

routes.post("/login", postLogin);

routes.get("/profile", getProfile);

export default routes;
