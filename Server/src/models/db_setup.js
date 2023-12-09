const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function setupDatabase() {
  const createGenreMasterTable = `
    CREATE TABLE IF NOT EXISTS genre_master (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL
    );
  `;

  const createStyleMasterTable = `
    CREATE TABLE IF NOT EXISTS style_master (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL
    );
  `;

  const createComplexityMasterTable = `
    CREATE TABLE IF NOT EXISTS complexity_master (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL
    );
  `;

  const createBooksTable = `
    CREATE TABLE IF NOT EXISTS books (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      author VARCHAR(255) NOT NULL,
      genre_id INT REFERENCES genre_master(id),
      style_id INT REFERENCES style_master(id),
      complexity_id INT REFERENCES complexity_master(id)
    );
  `;

  const insertDefaultGenres = `
  INSERT INTO genre_master (name) VALUES
  ('Science Fiction'),
  ('Fantasy'),
  ('Mystery'),
  ('Romance'),
  ('Horror'),
  ('Adventure'),
  ('Comedy'),
  ('Drama'),
  ('Action'),
  ('Thriller')
  ON CONFLICT (name) DO NOTHING;
`;

const insertDefaultStyles = `
  INSERT INTO style_master (name) VALUES
  ('Classic'),
  ('Contemporary'),
  ('Formal'),
  ('Descriptive'),
  ('Humorous'),
  ('Poetic'),
  ('Minimalist'),
  ('Fast-Paced'),
  ('Slow-Burningd'),
  ('Character-Driven'),
  ('Plot-Driven'),
  ('Multi-narrative')
  ON CONFLICT (name) DO NOTHING;
`;

const insertDefaultComplexities = `
  INSERT INTO complexity_master (name) VALUES
  ('Simple'),
  ('Moderate'),
  ('Straightforward'),
  ('Philosophical'),
  ('Dense'),
  ('Unconventional'),
  ('Complex')
  ON CONFLICT (name) DO NOTHING;
`;

  try {
    await pool.query(createGenreMasterTable);
    await pool.query(createStyleMasterTable);
    await pool.query(createComplexityMasterTable);
    await pool.query(createBooksTable);
    await pool.query(insertDefaultGenres);
    await pool.query(insertDefaultStyles);
    await pool.query(insertDefaultComplexities);
    console.log('Database tables created or already exist.');
  } catch (error) {
    console.error('Error setting up database tables:', error);
    throw error;
  }
}

module.exports = { pool, setupDatabase };
