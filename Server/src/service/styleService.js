const { pool } = require('../models/db_setup');

async function addStyle(name) {
  const insertStyleQuery = 'INSERT INTO style_master (name) VALUES ($1) RETURNING *';

  try {
    const result = await pool.query(insertStyleQuery, [name]);
    return result.rows[0];
  } catch (error) {
    console.error('Error adding Style:', error);
    throw error;
  }
}

async function getAllstyles() {
  const selectAllStylesQuery = 'SELECT * FROM style_master';

  try {
    const result = await pool.query(selectAllStylesQuery);
    return result.rows;
  } catch (error) {
    console.error('Error getting styles:', error);
    throw error;
  }
}

module.exports = { addStyle, getAllstyles };
