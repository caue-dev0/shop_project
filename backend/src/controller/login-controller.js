import { loginSchema } from "../schemas/login-schema.js";

import { createLogin } from "../service/login-service.js";

export async function login(req, res, next) {
  try {
    const data = loginSchema.parse(req.body);

    const user = await createLogin(data);

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}
