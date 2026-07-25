import { loginSchema } from "../schemas/login-schema.js";

import { login, profile } from "../service/login-service.js";

export async function postLogin(req, res, next) {
  try {
    const data = loginSchema.parse(req.body);

    const clients = await login(data);

    res.status(200).json(clients);
  } catch (err) {
    next(err);
  }
}

export async function getProfile(req, res, next) {
  try {
    const { authorization } = req.headers;

    const authorized = await profile(authorization);

    res.status(200).json(authorized);
  } catch (err) {
    next(err);
  }
}
