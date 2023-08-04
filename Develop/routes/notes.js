//The Express route listeners for notes will go on this file;
//get all the notes
//create a new note
//use customer.js under routes as an example for this one
//const notes = require("/").Router();
//anything that comes in with /api should go to index file
const router = require("express").Router();
const dbData = require("../db/db.json");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

//function readJsonFile() {}

// * `GET /notes` should return the `notes.html` file./logic for getting all the notes and send back a response
//read json file and get data out of it and send it back
router.get("/", (req, res) => {
  fs.readFile(path.join(__dirname, "../db/db.json"), "utf-8", (err, data) => {
    const parsed = JSON.parse(data);
    res.status(200).json(parsed);
  });
});

//route for creating a new note
// 1. read the existing file
//  2. make the file contents into a javascript array/ object
// 3. Update the data with new note
// 4. Re-write the json file with the new data
// 5. Send a response back to the browser

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

router.delete("/api/notes/:id", (req, res) => {
  fs.readFile("../db/db.json", "utf-8", (err, data) => {
    const parsed = JSON.parse(data);
    res.status(200).json({ notes: parsed });
  });
});

// You haven’t learned how to handle DELETE requests, but this application offers that functionality on the front end. As a bonus, try to add the DELETE route to the application using the following guideline:

// * `DELETE /api/notes/:id` should receive a query parameter that contains the id of a note to delete. To delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.

//module.exports = notes;
module.exports = router;
