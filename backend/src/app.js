import dotenv from "dotenv/config";
import express from "express";
import { errorMiddleware } from "./middleware/errors-middleware.js";
import {
  getAll,
  getById,
  postCreate,
  putUpdate,
  deleteRemove,
} from "./controller/clients-controller.js";
import { ApiError } from "./helpers/api-errors.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  getAll(req, res, next);
  throw new ApiError("cachorro na rua", 409);
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

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running | PORT: ${PORT}`);
});
