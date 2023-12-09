const { pool } = require('../models/db_setup');

async function addGenre(name) {
  const insertGenreQuery = 'INSERT INTO genre_master (name) VALUES ($1) RETURNING *';

  try {
    const result = await pool.query(insertGenreQuery, [name]);
    return result.rows[0];
  } catch (error) {
    console.error('Error adding genre:', error);
    throw error;
  }
}

async function getAllGenres() {
  const selectAllGenresQuery = 'SELECT * FROM genre_master';

  try {
    const result = await pool.query(selectAllGenresQuery);
    return result.rows;
  } catch (error) {
    console.error('Error getting genres:', error);
    throw error;
  }
}

module.exports = { addGenre, getAllGenres };
