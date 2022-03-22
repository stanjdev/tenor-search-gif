const express = require('express');
const handlebars = require('express-handlebars');
const Tenor = require('tenorjs').client({
  "Key": "M0CEO4N4KXT1",
  "Filter": "high",
  "Locale": "en_US",
})

const app = express();
app.use(express.static('public'));

// Middleware
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
// app.set('views', './views');

// Routes
app.get('/', (req, res) => {
  term = ""
  if (req.query.term) {
    term = req.query.term
  }
  // Tenor.search.Query("SEARCH KEYWORD HERE", "LIMIT HERE")
  Tenor.Search.Query(term, "10")
    .then((response) => {
      const gifs = response;
      res.render('home', { gifs })
    }).catch(console.error);
});

app.get('/greetings/:name', (req, res) => {
  const name = req.params.name;
  res.render('greetings', { name });
})

// Start Server

app.listen(3000, () => {
  console.log('Gif search listening on port localhost:3000');
})
