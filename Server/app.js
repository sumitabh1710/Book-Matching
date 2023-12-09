const express = require("express");
const routes = require("./src/routes/routes");
const { setupDatabase } = require("./src/models/db_setup");


const app = express();
const port = 4000;
const cors = require('cors');

app.use(cors());

setupDatabase();

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});