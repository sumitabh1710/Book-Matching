const { pool } = require("../models/db_setup");

async function getBooks() {
  const query = "SELECT * FROM books";
  const result = await pool.query(query);
  return result.rows;
}

async function insertBook(title, author, genre_id, style_id, complexity_id) {
  const query = `
    INSERT INTO books (title, author, genre_id, style_id, complexity_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  const values = [title, author, genre_id, style_id, complexity_id];
  const result = await pool.query(query, values);

  return result.rows[0];
}

async function matchedBooks(genre_id, style_id, complexity_id) {
    const allBooks = await getBooks();

    let helperArray = []
    
    allBooks.forEach(each => {
        var matchedElem = 0
        if(each.genre_id == genre_id) {
            matchedElem += 1
        }
        if(each.complexity_id == complexity_id) {
            matchedElem += 1
        }
        if(each.style_id == style_id) {
            matchedElem += 1
        }
        helperArray.push({
            title: each.title,
            author: each.author,
            percent: (matchedElem / 3) * 100
        })
    });

    return helperArray;
  }

module.exports = { getBooks, insertBook, matchedBooks };
