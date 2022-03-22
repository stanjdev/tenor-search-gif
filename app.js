const express = require('express');

const app = express();

// Middleware

// Routes
app.get('/', (req, res) => {
  res.send('Hello Squirrel');
});

// Start Server

app.listen(3000, () => {
  console.log('Gif search listening on port localhost:3000');
})
