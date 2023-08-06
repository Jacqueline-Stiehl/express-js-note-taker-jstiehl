const express = require("express");
const path = require("path");
const PORT = 3001;
const api = require("./routes");

const app = express();

app.use(express.static("public"));

// add 2 lines for allowing POST data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", api);

// home page route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// notes page
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
