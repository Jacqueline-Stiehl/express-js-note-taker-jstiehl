const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const {
  readFromFile,
  writeToFile,
} = require("../../../../real-lessons/11-Express/01-Activities/28-Stu_Mini-Project/Main/helpers/fsUtils");

router.get("/", (req, res) => {
  fs.readFile(path.join(__dirname, "../db/db.json"), "utf-8", (err, data) => {
    const parsed = JSON.parse(data);
    res.status(200).json(parsed);
  });
});

router.post("/", (req, res) => {
  const { title, text } = req.body;
  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };
    console.log(newNote);
    fs.readFile(path.join(__dirname, "../db/db.json"), "utf-8", (err, data) => {
      const parsed = JSON.parse(data);
      parsed.push(newNote);
      fs.writeFile(
        path.join(__dirname, "../db/db.json"),
        JSON.stringify(parsed),
        (err) => {
          err
            ? console.error(err)
            : console.log(
                `New note ${newNote.product} has been added to JSON file`
              );
        }
      );
      res.status(200).json(parsed);
    });
  } else {
    res.status(400).json("Must contain a note title");
  }
});

router.delete("/:id", (req, res) => {
  const noteID = req.params.id;
  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((id) => id.id !== noteID);
      writeToFile("./db/db.json", result);
      res.json(`${noteID} has been deleted.`);
    });
});

module.exports = router;
