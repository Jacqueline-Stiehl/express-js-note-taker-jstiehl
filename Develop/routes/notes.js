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

// * `GET /api/notes` should read the `db.json` file
//and return all saved notes as JSON.
// router.get("/api/notes", (req, res) => res.json(dbData));

// * `POST /api/notes` should receive a new note to save on
//the request body, add it to the `db.json` file, and then return
//the new note to the client. You'll need to find a way to give
//each note a unique id when it's saved (look into npm packages
//that could do this for you).

//my note: I did "npm install uuid" on 8-2-23 for unique ids

//prepare a response object to send back to the client
//   let response;
//   //from lesson 15 server.js file
//   if (req.body && req.body.product) {
//     response = {
//       status: "Success",
//       data: req.body,
//     };
//     res.status(201).json(response);
//   } else {
//     res.status(400).json("Must contain a note title");
//   }
//   console.log(req.body);

//route for creating a new note
// 1. read the existing file
//  2. make the file contents into a javascript array/ object
// 3. Update the data with new note
// 4. Re-write the json file with the new data
// 5. Send a response back to the browser

//OR:(from 19 Data Persistence)
router.post("/", (req, res) => {
  const { title, text } = req.body;
  if (title && text) {
    const newNote = {
      title,
      text,
      note_id: uuidv4(),
    };
    console.log(newNote);
    fs.readFile(path.join(__dirname, "../db/db.json"), "utf-8", (err, data) => {
      const parsed = JSON.parse(data);
      parsed.push(newNote);
    });
    fs.appendFile(
      path.join(__dirname, "../db/db.json"),
      `${newNote}.json`,
      (err) => {
        err
          ? console.error(err)
          : console.log(
              `New note ${newNote.product} has been added to JSON file`
            );
      }
    );
    res.status(200).json(parsed);

    //     //prepare a response object to send back to the client
    //       //from lesson 15 server.js file
    let response = {
      status: "Success",
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
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
