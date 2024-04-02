const express = require("express");
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");
const notes = require("./db/db.json");

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get("/api/notes", (req, res) => {
  console.info(`${req.method} request received to get reviews`);
  console.log(notes);
  const formattedNotes = JSON.stringify(notes);
  console.log(formattedNotes);
  // res.send(formattedNotes);
  res.json(notes);
});
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.post("/api/notes", (req, res) => {
  console.info(`${req.method} request received to add a review`);

  const { title, text } = req.body;

  if (title || note) {
    const newNote = {
      title,
      text,
      note_id: uuid.v1(),
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

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
