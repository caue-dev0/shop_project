import { ApiError } from "../helpers/api-errors.js";

export const errorMiddleware = (err, req, res, next) => {
  console.log(err);

  const statusCode = err.statusCode ?? 500;
  const message = err.message ? err : "Internal Error Server";

  return res.status(statusCode).json(message);
};
