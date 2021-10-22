const express = require('express');
const notes = express.Router();
const db = require('../db/db.json');
const fs = require('fs');
var uniqid = require('uniqid');

notes.use(express.json());
notes.use(express.urlencoded({ extended: true }));

notes.get('/', (req, res) => {
  res.json(db)
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

notes.delete('/:id', (req, res) => {
  const id = req.params.id;
  for (let i = 0; i<db.length;i++) {
    if (db[i].id == id) {
      db.splice(i,1)
      fs.writeFile('./db/db.json', JSON.stringify(db), (err) =>
        err
          ? console.error(err)
          : console.log(
            `Note deleted.`
          ))
      res.status(204)
    } 
  }
  res.status(500).json('Error in deleting note');
})

module.exports = notes;