const express = require('express');
const notes = express.Router();
const db = require('../db/db.json');
const fs = require('fs');
var uniqid = require('uniqid'); 

notes.use(express.json());
notes.use(express.urlencoded({ extended: true }));

notes.get('/', (req, res) => {
  res.json(db)
  // res.send(JSON.stringify(db))
})

notes.post('/', (req, res) => {
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      id: uniqid()
    }

    db.push(newNote)
    const newDb = JSON.stringify(db)

    fs.writeFile('./db/db.json', newDb, (err) =>
      err
        ? console.error(err)
        : console.log(
          `New Note for \"${title}\" has been written to JSON file`
        ))
    const response = {
      status: 'success',
      body: newNote,
    };
    res.status(201).json(response)
  } else {
    res.status(500).json('Error in posting note');
  }
})

module.exports = notes;