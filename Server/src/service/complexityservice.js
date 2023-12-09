const { pool } = require('../models/db_setup');

async function addComplexity(name) {
  const insertComplexityQuery = 'INSERT INTO complexity_master (name) VALUES ($1) RETURNING *';

  try {
    const result = await pool.query(insertComplexityQuery, [name]);
    return result.rows[0];
  } catch (error) {
    console.error('Error adding Complexity:', error);
    throw error;
  }
}

async function getAllComplexities() {
  const selectAllComplexitiesQuery = 'SELECT * FROM complexity_master';

  try {
    const result = await pool.query(selectAllComplexitiesQuery);
    return result.rows;
  } catch (error) {
    console.error('Error getting Complexities:', error);
    throw error;
  }
}

module.exports = { addComplexity, getAllComplexities };
