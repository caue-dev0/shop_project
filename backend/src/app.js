import dotenv from "dotenv/config";
import express from "express";

import {
  getAll,
  getById,
  postCreate,
  putUpdate,
  deleteRemove,
} from "./controller/clients-controller.js";

const app = express();
const PORT = process.env.PORT | 3000;

app.use(express.json());

app.get("/", (req, res) => {
  getAll(req, res);
});

app.get("/:id", (req, res) => {
  getById(req, res);
});

app.post("/", (req, res) => {
  postCreate(req, res);
});

app.put("/:id", (req, res) => {
  putUpdate(req, res);
});

app.delete("/:id", (req, res) => {
  deleteRemove(req, res);
});

app.listen(PORT, () => {
  console.log(`Server running | PORT: ${PORT}`);
});
