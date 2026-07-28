import { pool } from "../config/database.js";

export async function allUsers() {
  const user = await pool.query(
    `
    SELECT * FROM clients;
    `,
  );

  return user.rows;
}

export async function userById(id) {
  const user = await pool.query(
    `
    SELECT name, email, created_at FROM clients
    WHERE id = $1;
    `,
    [id],
  );

  return user.rows[0];
}

export async function userByEmail(email) {
  const user = await pool.query(
    `
    SELECT * FROM clients
    WHERE email = $1;
    `,
    [email],
  );

  return user.rows[0];
}

export async function createNewUser(data) {
  const user = await pool.query(
    `
    INSERT INTO clients (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING id, name, email, created_at;
    `,
    [data.name, data.email, data.password],
  );

  return user.rows[0];
}

export async function updateUserFull(id, data) {
  const user = await pool.query(
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

  return user;
}

export async function updateUserPartial(id, data) {
  const user = await pool.query(
    `
    UPDATE clients
    SET name = COALESCE($1, name),
        email = COALESCE($2, email),
        password = COALESCE($3, password)
    WHERE id = $4
    RETURNING id, name, email, created_at;
    `,
    [data.name, data.email, data.password, id],
  );

  return user.rows[0];
}

export async function deleteUser(id) {
  await pool.query(
    `
        DELETE FROM clients
        where id = $1
        `,
    [id],
  );
}
