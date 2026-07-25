import { pool } from "../database/pool.js";

import {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
} from "../helpers/api-errors.js";

import bcrypt from "bcrypt";

export async function listAllClients() {
  const clients = await pool.query(
    `
        SELECT id, name, email, created_at FROM clients;
        `,
  );

  return clients.rows;
}

export async function findClientsById(id) {
  const clients = await pool.query(
    `
        SELECT id, name, email, created_at FROM clients
        WHERE id = $1;
        `,
    [id],
  );

  return clients.rows[0];
}

export async function findClientsByEmail(email) {
  const clients = await pool.query(
    `
    SELECT id, name, email, password, created_at FROM clients
    WHERE email = $1;
    `,
    [email],
  );

  return clients.rows[0];
}

export async function createClients(data) {
  const clients = await findClientsByEmail(data.email);

  if (clients) {
    throw new ConflictError("E-mail já existe.");
  }

  const hashPassword = await bcrypt.hash(data.password, 10);

  const newCLients = await pool.query(
    `
        INSERT INTO clients (name, email, password)
        VALUES ($1, $2, $3)
        RETURNING id, name, email, created_at;
        `,
    [data.name, data.email, hashPassword],
  );

  return newCLients.rows[0];
}

export async function updateClients(id, data) {
  const emailExists = await findClientsByEmail(data.email);

  if (emailExists) {
    throw new ConflictError("email já existe");
  }

  const updatedClients = await pool.query(
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

  return updatedClients.rows[0];
}

export async function removeClients(id) {
  await pool.query(
    `
        DELETE FROM clients
        where id = $1
        `,
    [id],
  );
}
