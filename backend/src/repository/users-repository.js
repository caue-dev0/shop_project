import { pool } from "../config/database.js";

export async function findAll() {
  const user = await pool.query(
    `
    SELECT * FROM users;
    `,
  );

  return user.rows;
}

export async function findById(id) {
  const user = await pool.query(
    `
    SELECT name, email, created_at FROM users
    WHERE id = $1;
    `,
    [id],
  );

  return user.rows[0];
}

export async function findByEmail(email) {
  const user = await pool.query(
    `
    SELECT * FROM users
    WHERE email = $1;
    `,
    [email],
  );

  return user.rows[0];
}

export async function create(data) {
  const user = await pool.query(
    `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING id, name, email, created_at;
    `,
    [data.name, data.email, data.password],
  );

  return user.rows[0];
}

export async function updateFull(id, data) {
  const user = await pool.query(
    `
        UPDATE users
        SET name = $1,
            email = $2,
            password = $3
        WHERE id = $4
        RETURNING id, name, email, created_at;
        `,
    [data.name, data.email, data.password, id],
  );

  return user.rows[0];
}

export async function updateParcial(id, data) {
  const user = await pool.query(
    `
    UPDATE users
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

export async function remove(id) {
  await pool.query(
    `
        DELETE FROM users
        where id = $1
        `,
    [id],
  );
}
