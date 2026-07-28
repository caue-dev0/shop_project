import { pool } from "../database/pool.js";

import {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
} from "../helpers/api-errors.js";

import bcrypt from "bcrypt";

export async function listAllUsers() {
  const users = await pool.query(
    `
        SELECT id, name, email, created_at FROM clients;
        `,
  );

  return users.rows;
}

export async function findUsersById(id) {
  const users = await pool.query(
    `
        SELECT id, name, email, created_at FROM clients
        WHERE id = $1;
        `,
    [id],
  );

  return users.rows[0];
}

export async function findUsersByEmail(email) {
  const users = await pool.query(
    `
    SELECT id, name, email, password, created_at FROM clients
    WHERE email = $1;
    `,
    [email],
  );

  return users.rows[0];
}

export async function createUsers(data) {
  const clients = await findUsersByEmail(data.email);

  if (clients) {
    throw new ConflictError("E-mail já existe.");
  }

  const hashPassword = await bcrypt.hash(data.password, 10);

  const newUsers = await pool.query(
    `
        INSERT INTO clients (name, email, password)
        VALUES ($1, $2, $3)
        RETURNING id, name, email, created_at;
        `,
    [data.name, data.email, hashPassword],
  );

  return newUsers.rows[0];
}

export async function updateUsers(id, data) {
  // - pego o usuário
  // - faço uma busca com os dados enviado
  // - comparo se os dados enviados bate com o que já estava no banco de dados

  const user = await findUsersById(id);

  if (!user) {
    throw new NotFoundError("Usuário não existe");
  }

  const emailExists = await findUsersByEmail(data.email);

  if (emailExists && emailExists.id !== user.id) {
    throw new ConflictError("email já existe");
  }

  const hashPassword = await bcrypt.hash(data.password, 10);

  const updatedUsers = await pool.query(
    `
        UPDATE clients
        SET name = $1,
            email = $2,
            password = $3
        WHERE id = $4
        RETURNING id, name, email, created_at;
        `,
    [data.name, data.email, hashPassword, id],
  );

  return updatedUsers.rows[0];
}

export async function updateParcialUsers(id, data) {
  const user = await findUsersById(id);

  if (!user) {
    throw new NotFoundError("Usuário não existe");
  }

  if (data.email) {
    const emailExists = await findUsersByEmail(data.email);

    if (emailExists && emailExists.id !== user.id) {
      throw new ConflictError("email já existe");
    }
  }

  let hashPassword = null;

  if (data.password) {
    hashPassword = await bcrypt.hash(data.password, 10);
  }
  const updatedUsers = await pool.query(
    `
    UPDATE clients
    SET name = COALESCE($1, name),
        email = COALESCE($2, email),
        password = COALESCE($3, password)
    WHERE id = $4
    RETURNING id, name, email, created_at;
    `,
    [data.name, data.email, hashPassword, id],
  );

  return updatedUsers.rows[0];
}

export async function removeUsers(id) {
  await pool.query(
    `
        DELETE FROM clients
        where id = $1
        `,
    [id],
  );
}
