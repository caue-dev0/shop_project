import dotenv from "dotenv/config";

import express, { Router } from "express";

import { errorMiddleware } from "./middleware/errors-middleware.js";

import routes from "./routes/routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running | PORT: ${PORT}`);
});
