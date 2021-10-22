// Imports
const express = require('express')
const path = require('path')
const api = require('./routes/index.js')

const PORT = process.env.PORT || 3000

// express initialization
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// api routes
app.use('/api', api);

// creating public forlder static
app.use(express.static('public'))

// path to html files
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
)

app.get('/notes', (req,res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
)

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
