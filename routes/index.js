const express = require('express');
// importing path to notes
const notesRouter = require('./notes');

// initializating express
const app = express();

// path for routers
app.use('/notes', notesRouter);

module.exports = app;