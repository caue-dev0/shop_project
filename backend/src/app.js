import dotenv from "dotenv/config";

import express from "express";

import cors from "cors";

import { errorMiddleware } from "./middleware/errors-middleware.js";

import routes from "./routes/routes.js";

const app = express();
const PORT = process.env.PORT;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running\nlocal: http://localhost:${PORT}/\n$`);
});
