import { pool } from "../config/database.js";

export async function findAll() {
  const products = await pool.query(`
    SELECT * FROM products
    `);
  return products.rows;
}

export async function findById(id) {
  const product = await pool.query(
    `
    SELECT * FROM products
    WHERE id = $1
    `,
    [id],
  );
  return product.rows[0];
}

export async function create(id, data) {
  const product = await pool.query(
    `
    INSERT INTO products(user_id, name, price)
    VALUES ($1, $2, $3)
    RETURNING *
    `,
    [id, data.name, data.price],
  );
  return product.rows[0];
}

export async function updateFull(id, data) {
  const product = await pool.query(
    `
    UPDATE products
    SET name = $1,
        price = $2
    WHERE id = $3
    RETURNING id, name, price, created_at
    `,
    [data.name, data.price, id],
  );
  return product.rows[0];
}

export async function updateParcial(id, data) {
  const product = await pool.query(
    `
    UPDATE products
    SET name = COALESCE($1, name),
        price = COALESCE($2, price)
    WHERE id = $3
    RETURNING id, name, price, created_at
    `,
    [data.name, data.price, id],
  );
  return product.rows[0];
}

export async function remove(id) {
  await pool.query(
    `
    DELETE FROM products
    WHERE id = $1
    `,
    [id],
  );
}
