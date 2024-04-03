const express = require("express");
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");
// const notes = require("./db/db.json");

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get("/api/notes", (req, res) => {
  console.info(`${req.method} request received to get notes`);
  // console.log(notes);

  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Line25: ${data}`); //array of JSON objects
      // let notes = JSON.parse(data);
      // console.log(`Line 27 ${notes}`);
      res.json(data);
    }
  });
});
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.post("/api/notes", (req, res) => {
  console.info(`${req.method} request received to add notes`);

  const { title, text } = req.body;

  if (title || note) {
    const newNote = {
      title,
      text,
      id: uuid.v1(),
    };

    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedNotes = JSON.parse(data);

        parsedNotes.push(newNote);

        fs.writeFile(
          "./db/db.json",
          JSON.stringify(parsedNotes, null, 4),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info(`Successfully updated notes!`)
        );
      }
    });

    const response = {
      status: "success",
      body: newNote,
    };

    console.log(response);

    res.status(201).json(response);
  } else {
    res.status(500).json("Error in posting note");
  }
});

app.delete("/api/notes/:id", (req, res) => {
  console.info(`${req.method} request received to delete a note`);
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log(data);
    }
  });
});
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
