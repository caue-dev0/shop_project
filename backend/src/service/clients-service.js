import { pool } from "../database/pool.js";

import {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
} from "../helpers/api-errors.js";

import bcrypt from "bcrypt";

export async function listAll() {
  const clients = await pool.query(
    `
        SELECT id, name, email, created_at FROM clients;
        `,
  );

  return clients.rows;
}

export async function findById(id) {
  const user = await pool.query(
    `
        SELECT id, name, email, created_at FROM clients
        WHERE id = $1;
        `,
    [id],
  );

  return user.rows[0];
}

export async function findByEmail(email) {
  const user = await pool.query(
    `
    SELECT id, name, email, password, created_at FROM clients
    WHERE email = $1;
    `,
    [email],
  );

  return user.rows[0];
}

export async function create(data) {
  const user = await findByEmail(data.email);

  if (user) {
    throw new ConflictError("E-mail já existe.");
  }

  const hashPassword = await bcrypt.hash(data.password, 10);

  const newUser = await pool.query(
    `
        INSERT INTO clients (name, email, password)
        VALUES ($1, $2, $3)
        RETURNING id, name, email, created_at;
        `,
    [data.name, data.email, hashPassword],
  );

  return newUser.rows[0];
}

export async function update(id, data) {
  const emailExists = await findByEmail(data.email);

  if (emailExists) {
    throw new ConflictError("email já existe");
  }

  const updatedUser = await pool.query(
    `
        UPDATE clients
        SET name = $1,
            email = $2,
            password = $3
        WHERE id = $4
        RETURNING id, name, email, created_at;
        `,
    [data.name, data.email, data.password, id],
  );

  return updatedUser.rows[0];
}

export async function remove(id) {
  await pool.query(
    `
        DELETE FROM clients
        where id = $1
        `,
    [id],
  );
}
