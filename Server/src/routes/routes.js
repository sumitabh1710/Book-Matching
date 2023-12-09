const express = require("express");
const router = express.Router();
const genreService = require("../service/genreService");
const styleService = require("../service/styleService");
const complexityService = require("../service/complexityservice");
const bookService = require("../service/bookService");

router.use(express.json());

router.post("/genres", async (req, res) => {
  try {
    const { name } = req.body;
    const addedGenre = await genreService.addGenre(name);
    res.status(201).json(addedGenre);
  } catch (error) {
    console.error("Error adding genre:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/genres", async (req, res) => {
  try {
    const genres = await genreService.getAllGenres();
    res.status(200).json(genres);
  } catch (error) {
    console.error("Error getting genres:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/styles", async (req, res) => {
  try {
    const { name } = req.body;
    const addedStyle = await styleService.addStyle(name);
    res.status(201).json(addedStyle);
  } catch (error) {
    console.error("Error adding style:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/styles", async (req, res) => {
  try {
    const styles = await styleService.getAllstyles();
    res.status(200).json(styles);
  } catch (error) {
    console.error("Error getting styles:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/complexities", async (req, res) => {
  try {
    const { name } = req.body;
    const addedComplexity = await complexityService.addComplexity(name);
    res.status(201).json(addedComplexity);
  } catch (error) {
    console.error("Error adding complexity:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/complexities", async (req, res) => {
  try {
    const Complexities = await complexityService.getAllComplexities();
    res.status(200).json(Complexities);
  } catch (error) {
    console.error("Error getting Complexities:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/books", async (req, res) => {
  try {
    const books = await bookService.getBooks();
    res.status(200).json(books);
  } catch (error) {
    console.error("Error getting books:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/book", async (req, res) => {
  try {
    const { title, author, genre_id, style_id, complexity_id } = req.body;
    const addBook = await bookService.insertBook(
      title,
      author,
      genre_id,
      style_id,
      complexity_id
    );
    res.status(200).json(addBook);
  } catch (error) {
    console.error("Error adding complexity:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/book-match", async (req, res) => {
  try {
    const { genre_id, style_id, complexity_id } = req.body;
    const allBooks = await bookService.matchedBooks(
      genre_id,
      style_id,
      complexity_id
    );
    console.log(allBooks);
    res.status(200).json(allBooks);
  } catch (error) {
    console.error("Error adding complexity:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
