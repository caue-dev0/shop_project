CREATE TABLE users (
  id         UUID PRIMARY KEY DEFAULT uuidv7(),
  name       TEXT NOT NULL,
  email      TEXT NOT NULL UNIQUE,
  password   TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE products (
  id         SERIAL PRIMARY KEY,
  user_id    UUID NOT NULL references users(id)
             ON DELETE CASCADE,
  name       TEXT NOT NULL,
  price      NUMERIC NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
