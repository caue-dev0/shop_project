import dotenv from "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import errorsHandling from "./middleware/errors-middleware.js";

import {
  getAll,
  getById,
  postCreate,
  putUpdate,
  deleteRemove,
} from "./controller/clients-controller.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false, limit: "100kb" }));

app.get("/", (req, res, next) => {
  getAll(req, res, next);
});

app.get("/:id", (req, res, next) => {
  getById(req, res, next);
});

app.post("/", (req, res, next) => {
  postCreate(req, res, next);
});

app.put("/:id", (req, res, next) => {
  putUpdate(req, res, next);
});

app.delete("/:id", (req, res, next) => {
  deleteRemove(req, res, next);
});

app.use(errorsHandling);

app.listen(PORT, () => {
  console.log(`Server running | PORT: ${PORT}`);
});
